/*eslint-env node,jasmine*/
var jasmine = require("jasmine-core");
var fetch = require("node-fetch");
var MetadataClient = require("../MetadataClient.js");

describe("metadataSoeUtils test suite", function () {

    it("should be able to test for metadata SOE support", function (done) {
        var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
        client.supportsMetadata.then(function (isSupported) {
            expect(isSupported).toBe(true);
            // Test subsequent request, which is stored in variable instead of additional HTTP request.
            client.supportsMetadata.then(function (isSupported) {
                expect(isSupported).toBe(true);
                done();
            });
        });
    });

    it("Esri service will not support SOE", function (done) {
        var client = new MetadataClient("http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer");
        client.supportsMetadata.then(function (isSupported) {
            expect(isSupported).toBe(false);
            done();
        });
    });

});