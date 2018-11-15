/// <reference lib="es2015" />

if (typeof fetch === "undefined") {
  // tslint:disable-next-line:no-var-requires
  require("isomorphic-fetch");
}

import {
  detectLayerMetadataSupport,
  getLayerSources,
  getMetadataLinks,
  getValidLayers
} from "../index";

const serviceUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer";

describe("metadataSoeUtils test suite", () => {
  it("should be able to test for metadata SOE support", async done => {
    try {
      const supportsMetadata = await detectLayerMetadataSupport(serviceUrl);
      expect(supportsMetadata).toEqual(true);
      done();
    } catch (error) {
      done.fail(error);
    }
  });

  it("should be able to get valid layers", async done => {
    try {
      const validLayers = await getValidLayers(serviceUrl, false);
      expect(validLayers).toBeTruthy();
      done();
    } catch (error) {
      done.fail(error);
    }
  });

  it("should be able to get metadata layer sources", async done => {
    try {
      const layerSources = await getLayerSources(serviceUrl);
      expect(typeof layerSources).toBe("object");
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it("should be able to get URLs for metadata (metadataLinks)", async done => {
    try {
      const links = await getMetadataLinks(serviceUrl);
      expect(typeof links).toBe("object");
      for (const key in links) {
        if (links.hasOwnProperty(key)) {
          expect(typeof key).toBe("string");
          expect(key).toBeTruthy();
          const url = links[key];
          expect(typeof url).toBe("string");
          expect(
            url.match(
              /^https?\:\/\/.+\/exts\/LayerMetadata\/metadata\/\d+\/?$/i
            )
          ).toBeTruthy();
        }
      }
      done();
    } catch (error) {
      done.fail(error);
    }
  });

  describe("test against layers that don't support metadata SOE", () => {
    it("Esri service will not support SOE", async done => {
      const esriUrl =
        "http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer";
      try {
        const supportsMetadata = await detectLayerMetadataSupport(esriUrl);
        expect(supportsMetadata).toBe(false);
        done();
      } catch (error) {
        done.fail(error);
      }
    });
  });
});
