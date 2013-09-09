/*globals define */
/*jslint white:true */

// Copyright ©2012 Washington State Department of Transportation (WSDOT).  Released under the MIT license (http://opensource.org/licenses/MIT).

/**
 * This JS file extends the esri.layer.Layers class to provide functions that work with WSDOT's Layer Metadata Server Object Extension (SOE).
 * @author Jeff Jacobson
 */

//dojo.require("esri.layers.FeatureLayer");

define([
	"dojo/_base/lang",
	"dojo/request/script",
	"dojo/ready",
	"esri/layers/layer",
	"esri/layers/DynamicMapServiceLayer",
	"esri/layers/ArcGISTiledMapServiceLayer",
	"esri/layers/FeatureLayer"
], function (lang, script, ready, Layer, DynamicMapServiceLayer, ArcGISTiledMapServiceLayer, FeatureLayer) {
	"use strict";

	var layerUrlRe = /([\w\d\/\:%\.]+\/MapServer)(?:\/(\d*))?\/?$/i; // Match results: [full url, map server url, layer id]

	/**
	 * Examines a layer (or a layer URL) and returns the map service url and layer id parts as properties in the returned object.
	 * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object. 
	 * @returns {Object} An object with the properties mapServerUrl and layerId.  mapServerUrl is the url to the map server (without any layerIDs).  layerId is the layer ID portion of the URL.  If the URL did not contain a layerID, this property will have a value of null.
	 */
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


	/**
	 * Given an esri.layers.Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE root page. 
	 * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
	 * @returns {String} The URL to the SOE root. 
	 */
	function getMetadataSoeRootUrl(layer) {
		var output, url = getMapServerUrl(layer); // This will throw an Error if it fails.
		output = url.mapServerUrl + "/exts/LayerMetadata";
		return output;
	}



	/**
	 * Given an esri.layers.Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE for a list of valid layer IDs. 
	 * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
	 * @returns {String} The URL to a query for a list of valid layers. 
	 */
	function getValidLayersUrl(layer) {
		var url = getMapServerUrl(layer); // This will throw an Error if it fails.
		return url.mapServerUrl + "/exts/LayerMetadata/validLayers";
	}



	/**
	 * Returns the Layer Metadata SOE URL to retrieve the metadata for a map service feature layer.
	 * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
	 * @param {Number} [sublayerId] If the URL provided via the layer parameter does not contain a layer ID, this parameter must be used to supply one.  If the URL already has a layer ID, this parameter will be ignored.
	 * @param {String} [format] The format parameter that will be appended as a query string.  If omitted, no query string will be appended to the URL.
	 */
	function getMetadataUrl(layer, sublayerId, format) {
		var urlInfo = getMapServerUrl(layer), output;
		if (urlInfo.layerId !== null) {
			sublayerId = urlInfo.layerId;
		}
		if (typeof (sublayerId) !== "number") {
			throw new Error("Invalid layer id.  Layer id must be an integer.");
		}
		output = urlInfo.mapServerUrl + "/exts/LayerMetadata/metadata/" + String(sublayerId);

		if (format) {
			output += "?f=" + format;
		}

		return output;
	}



	/**
	 * Calls the SOE to get the list of layer IDs that correspond to feature layers. 
	 * @param {String|esri.layers.Layer} layer Either a map service or map service layer URL, or an esri.layers.Layer object.
	 * @param {Function} Event handler function that is called when the query is successful.  Parameter "data" is an array of integers.
	 * @param {Function} Event handler function that is called when the query fails.  Parameter "error" is an Error.
	 */
	function getIdsOfLayersWithMetadata(layer, successHandler, failHandler) {
		try {
			return script.get(getValidLayersUrl(layer), {
				jsonp: "callback",
				query: {
					"f": "json"
				}
			}).then(function (data) {
				if (typeof (data.error) !== "undefined" && typeof (failHandler) === "function") {
					failHandler(data.error);
				}
				else if (typeof (successHandler) === "function") {
					// In the ArcGIS 10.0 version, an array was returned.
					// In the ArcGIS 10.1 version, an object is returned.  
					// This object has a property called layerIds which is an array. 
					if (data instanceof Array) { //!dojo.isArray(data)) {
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
		try {
			return script.get(getMetadataSoeRootUrl(layer), {
				jsonp: "callback",
				query: {
					"f": "json"
				}
			}).then(function (data) {
				if (typeof (data.error) !== "undefined" && typeof (failHandler) === "function") {
					failHandler(data.error);
				}
				else if (typeof (successHandler) === "function") {
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

	return {
		getMapServerUrl: getMapServerUrl,
		getMetadataSoeRootUrl: getMetadataSoeRootUrl,
		getLayersWithMetadataUrl: getValidLayersUrl,
		getMetadataUrl: getMetadataUrl,
		getIdsOfLayersWithMetadata: getIdsOfLayersWithMetadata,
		supportsMetadata: supportsMetadata
	};
});
