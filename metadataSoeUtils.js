(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("node-fetch"));
    } else {
        // Browser globals (root is window)
        root.metadataSoeUtils = factory();
    }
}(this, function (fetchPolyfill) {

    /**
     * Metadata SOE Utility module
     * @module metadataSoeUtils
     */

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
                fetch(url + "?f=json").then(function (response) {
                    return response.json();
                }).then(function (serviceInfo) {
                    var supportedExtensions = serviceInfo && serviceInfo.supportedExtensions ? serviceInfo.supportedExtensions.split(/[,\s]+/) : null;
                    if (Array.isArray(supportedExtensions)) {
                        resolve(arrayContainsString(supportedExtensions, "LayerMetadata"));
                    }
                    resolve(false);
                });
            });
        }
    };


    return exports;
}));