require([
    "MetadataClient/metadataExtensions",
    "esri/layers/ArcGISDynamicMapServiceLayer"
], function (
    metadataExtensions,
    ArcGISDynamicMapServiceLayer
) {
    describe("metadata extensions", function () {
        var layer = new ArcGISDynamicMapServiceLayer("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
        it("should support metadata test", function (done) {
            layer.supportsMetadata().then(function (isSupported) {
                expect(isSupported).toBe(true);
                done();
            }, function (error) {
                done.fail(error);
            });
        });
    });
})