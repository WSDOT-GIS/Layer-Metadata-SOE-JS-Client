/*eslint-env node,jasmine*/
var jasmine = require("jasmine-core");
var fetch = require("node-fetch");
var metadataSoeUtils = require("../metadataSoeUtils.js");

describe("metadataSoeUtils test suite", function () {

    it("should be able to test for metadata SOE support", function (done) {
        var mapServerUrl = "http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer";
        metadataSoeUtils.testServiceForMetadataSupport(mapServerUrl).then(function (isSupported) {
            expect(isSupported).toBe(true);
            // Test subsequent request, which is stored in variable instead of additional HTTP request.
            metadataSoeUtils.testServiceForMetadataSupport(mapServerUrl).then(function (isSupported) {
                expect(isSupported).toBe(true);
                done();
            });
        });
    });

    it("Esri service will not support SOE", function (done) {
        var url = "http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer";
        metadataSoeUtils.testServiceForMetadataSupport(url).then(function (isSupported) {
            expect(isSupported).toBe(false);
            done();
        });
    });

});