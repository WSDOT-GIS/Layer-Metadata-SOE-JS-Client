(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.

        // Node doesn't support fetch natively, so this capability must be loaded.
        module.exports = factory(require("node-fetch"));
    } else {
        // Browser globals (root is window)
        root.metadataSoeUtils = factory();
    }
}(this, function (fetchPolyfill) {

    var validLayersUrl = "exts/LayerMetadata/validLayers?f=json";
    var layerSourcesUrl = "exts/LayerMetadata/layerSources?f=json";

    /**
     * Metadata SOE Utility module
     * @module metadataSoeUtils
     */

    // Enable fetch in node.
    // Browser polyfills will be handled with browser script tags.
    if (fetchPolyfill) {
        fetch = fetchPolyfill;
    }

    /**
     * Determines if an array contains a specific string.
     * @param {string[]} a - An array
     * @param {string} s - a string
     * @returns {Boolean} - Returns true if it does, false if it doesn't.
     */
    function arrayContainsString(a, s) {
        var output = false;
        for (var i = 0; i < a.length; i++) {
            if (a[i] === s) {
                output = true;
                break;
            }
        }
        return output;
    }

    // Once a service is queried for support, store it here so subsequent queries
    // for same service no longer require HTTP request.
    var metadataSupportInfo = {};

    var exports = {
        /**
         * Tests a map service to see if it supports the Layer Metadata SOE.
         * @param {string} url - The URL to a map service.
         * @returns {Promise.<Boolean>} - Returns a promise that, when resolved, returns a boolean value
         * indicating if the service supports the layer metadata capability.
         */
        testServiceForMetadataSupport: function (url) {
            if (typeof url === "object" && url.url) {
                url = url;
            }
            if (!url) {
                throw new TypeError("No map service URL provided.");
            }

            return new Promise(function (resolve, reject) {
                if (metadataSupportInfo.hasOwnProperty(url)) {
                    resolve(metadataSupportInfo[url]);
                } else {
                    fetch(url + "?f=json").then(function (response) {
                        return response.json();
                    }).then(function (serviceInfo) {
                        var supportedExtensions = serviceInfo && serviceInfo.supportedExtensions ? serviceInfo.supportedExtensions.split(/[,\s]+/) : null;
                        var isSupported = Array.isArray(supportedExtensions) && arrayContainsString(supportedExtensions, "LayerMetadata");
                        resolve(isSupported);
                    });
                }
            });
        }
    };


    return exports;
}));