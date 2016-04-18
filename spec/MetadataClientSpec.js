/*eslint-env node,jasmine*/

if (typeof MetadataClient === "undefined") {
    var MetadataClient = require('../MetadataClient.js');
}

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

    it("should be able to get valid layers", function (done) {
        var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
        try {
            client.validLayers.then(function (layers) {
                expect(layers).toBeTruthy();
                done();
            }, function (err) {
                done.fail(err);
            });
        } catch (e) {
            done.fail(e);
        }
    });

    it("should be able to get metadata layer sources", function (done) {
        var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
        try {
            client.layerSources.then(function (layerSources) {
                expect(typeof layerSources).toBe("object");
                done();
            }, function (error) {
                console.error(error);
                done.fail(error);
            });
        } catch (err) {
            done.fail(err);
        }
    });

    describe("test against layers that don't support metadata SOE", function () {
        it("Esri service will not support SOE", function (done) {
            var client = new MetadataClient("http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer");
            client.supportsMetadata.then(function (isSupported) {
                expect(isSupported).toBe(false);
                done();
            });
        });
    });
});