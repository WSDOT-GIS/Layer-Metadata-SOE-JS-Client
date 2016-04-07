/*eslint-env node,jasmine*/
var jasmine = require("jasmine-core");
var fetch = require("node-fetch");
var metadataSoeUtils = require("../metadataSoeUtils.js");

describe("metadataSoeUtils test suite", function () {

    it("should be able to test for metadata SOE support", function (done) {
        var mapServerUrl = "http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer";
        metadataSoeUtils.testServiceForMetadataSupport(mapServerUrl).then(function (isSupported) {
            expect(isSupported).toBe(true);
            done();
        });
    });

});