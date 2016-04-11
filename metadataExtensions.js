/*globals define */
/*jslint white:true */

/**
 * This JS file extends the esri.layer.Layers class to provide functions that work with WSDOT's Layer Metadata Server Object Extension (SOE).
 * @author Jeff Jacobson
 */

define([
    "dojo/_base/lang",
    "esri/request",
    "dojo/ready",
    "esri/layers/layer",
    "esri/layers/DynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/FeatureLayer",
    "./MetadataClient"
], function (
    lang,
    esriRequest,
    ready,
    Layer,
    DynamicMapServiceLayer,
    ArcGISTiledMapServiceLayer,
    FeatureLayer,
    MetadataClient
) {
    "use strict";

    var layerUrlRe = /([\w\d\/\:%\.]+\/MapServer)(?:\/(\d*))?\/?$/i; // Match results: [full url, map server url, layer id]

    function getMapServerUrl(layer) {
        var url, match, output;
        if (layer) {
            if (typeof (layer) === "string") {
                url = layer;
            } else if (typeof (layer.url) === "string") {
                url = layer.url;
            } else {
                throw new TypeError("The layer parameter must be either a string or a Layer.");
            }
        } else {
            throw new TypeError("The layer parameter must be either a string or an esri.layers.Layer.");
        }

        match = url.match(layerUrlRe);

        if (match) {
            output = {
                mapServerUrl: match[1],
                layerId: match.length >= 3 && match[2] ? Number(match[2]) : null
            };
            if (isNaN(output.layerId)) {
                output.layerId = null;
            } else {
                return output;
            }
        } else {
            throw new Error("Invalid layer URL format.");
        }
    }

    function getMetadataSoeRootUrl(layer) {
        var output, url = getMapServerUrl(layer); // This will throw an Error if it fails.
        output = url.mapServerUrl + "/exts/LayerMetadata";
        return output;
    }

    function getValidLayersUrl(layer) {
        var url = getMapServerUrl(layer); // This will throw an Error if it fails.
        return url.mapServerUrl + "/exts/LayerMetadata/validLayers";
    }

    function getMetadataUrl(layer, sublayerId) {
        var urlInfo = getMapServerUrl(layer), output;
        if (urlInfo.layerId !== null) {
            sublayerId = urlInfo.layerId;
        }
        if (typeof (sublayerId) !== "number") {
            throw new Error("Invalid layer id.  Layer id must be an integer.");
        }
        output = urlInfo.mapServerUrl + "/exts/LayerMetadata/metadata/" + String(sublayerId);

        return output;
    }

    function getIdsOfLayersWithMetadata(layer, successHandler, failHandler) {
        try {
            return esriRequest({
                url: getValidLayersUrl(layer),
                callbackParamName: "callback",
                content: {
                    "f": "json"
                }
            }, {
                useProxy: false
            }).then(function (data) {
                if (typeof (data.error) !== "undefined" && typeof (failHandler) === "function") {
                    failHandler(data.error);
                }
                else if (typeof (successHandler) === "function") {
                    // In the ArcGIS 10.0 version, an array was returned.
                    // In the ArcGIS 10.1 version, an object is returned.
                    // This object has a property called layerIds which is an array.
                    if (!(data instanceof Array)) {
                        data = data.layerIds;
                    }
                    successHandler(data);
                }
            }, function (error) {
                if (typeof (failHandler) === "function") {
                    failHandler(error);
                }
            });
        } catch (err) {
            if (failHandler) {
                failHandler(err);
            }
        }
    }

    function supportsMetadata(layer, successHandler, failHandler) {
        var url = getMapServerUrl(layer).mapServerUrl;
        var client = new MetadataClient(url);
        var promise = client.supportsMetadata;
        promise.then(function (isSupported) {
            if (isSupported && typeof successHandler === "function") {
                successHandler(isSupported);
            } else if (typeof failHandler === "function") {
                failHandler(isSupported);
            }
        }, function (error) {
            if (typeof failHandler === "function") {
                failHandler(error);
            }
        });
        return promise;
    }

    function addExtensions() {
        var i, l, ctor, f, f2, f3, multiLayerClasses = [DynamicMapServiceLayer, ArcGISTiledMapServiceLayer];


        lang.extend(Layer, {
            getIdsOfLayersWithMetadata: function (successHandler, failHandler) {
                return getIdsOfLayersWithMetadata(this, successHandler, failHandler);
            }
        });

        f = function (layerId, format) {
            return getMetadataUrl(this, layerId, format);
        };
        f2 = function () {
            return getMetadataSoeRootUrl(this);
        };

        f3 = function (successHandler, failHandler) {
            return supportsMetadata(this, successHandler, failHandler);
        };

        for (i = 0, l = multiLayerClasses.length; i < l; i += 1) {
            ctor = multiLayerClasses[i];
            lang.extend(ctor, {
                getMetadataUrl: f,
                getMetadataSoeRootUrl: f2,
                supportsMetadata: f3
            });
        }

        f = function (format) {
            return getMetadataUrl(this, null, format);
        };

        lang.extend(FeatureLayer, {
            getMetadataUrl: f
        });
    }

    ready(addExtensions);

    /**
     * Extends the layer classes to add methods for calling the Layer Metadata SOE.
     * @exports metadataExtension
     * @deprecated
     */
    var exports = {
        /**
         * Examines a layer (or a layer URL) and returns the map service url and layer id parts as properties in the returned object.
         * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
         * @returns {Object} An object with the properties mapServerUrl and layerId.  mapServerUrl is the url to the map server (without any layerIDs).  layerId is the layer ID portion of the URL.  If the URL did not contain a layerID, this property will have a value of null.
         */
        getMapServerUrl: getMapServerUrl,
        /**
         * Given an esri.layers.Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE root page.
         * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
         * @returns {String} The URL to the SOE root.
         */
        getMetadataSoeRootUrl: getMetadataSoeRootUrl,
        /**
         * Given an esri.layers.Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE for a list of valid layer IDs.
         * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
         * @returns {String} The URL to a query for a list of valid layers.
         */
        getLayersWithMetadataUrl: getValidLayersUrl,
        /**
         * Returns the Layer Metadata SOE URL to retrieve the metadata for a map service feature layer.
         * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
         * @param {Number} [sublayerId] If the URL provided via the layer parameter does not contain a layer ID, this parameter must be used to supply one.  If the URL already has a layer ID, this parameter will be ignored.
         */
        getMetadataUrl: getMetadataUrl,
        /**
         * Calls the SOE to get the list of layer IDs that correspond to feature layers.
         * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
         * @param {Function} Event handler function that is called when the query is successful.  Parameter "data" is an array of integers.
         * @param {Function} Event handler function that is called when the query fails.  Parameter "error" is an Error.
         */
        getIdsOfLayersWithMetadata: getIdsOfLayersWithMetadata,
        /**
         * Tests to see if a layer supports metadata.
         * @param {esri/layers/Layer} layer - Either a map service or map service layer URL, or an esri.layers.Layer object.
         * @param {function} successHandler - Function that is called when metadata is supported.
         * @param {function} failHandler - Function that is called when metadata is not supported.
         * @returns {Promise.<Boolean>} - Returns a promise. When resolved, a boolean value indicates if the layer supports metadata.
         */
        supportsMetadata: supportsMetadata
    };

    return exports;
});
