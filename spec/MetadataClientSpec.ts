/// <reference lib="es2015" />

import {
  detectLayerMetadataSupport,
  getLayerSources,
  getMetadataLinks,
  getValidLayers
} from "../index";

const serviceUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/CityLimits/MapServer";

describe("metadataSoeUtils test suite", () => {
  it("should be able to test for metadata SOE support", async () => {
    const supportsMetadata = await detectLayerMetadataSupport(serviceUrl);
    expect(supportsMetadata).toEqual(true);
  });

  it("should be able to get valid layers", async () => {
    const validLayers = await getValidLayers(serviceUrl);
    expect(validLayers).toBeTruthy();
  });

  it("should be able to get metadata layer sources", async () => {
      const layerSources = await getLayerSources(serviceUrl);
      expect(typeof layerSources).toBe("object");
  });

  it("should be able to get URLs for metadata (metadataLinks)", async () => {
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
  });

  describe("test against layers that don't support metadata SOE", () => {
    it("Esri service will not support SOE", async () => {
      const esriUrl =
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer";
        const supportsMetadata = await detectLayerMetadataSupport(esriUrl);
        expect(supportsMetadata).toBe(false);
    });
  });
});
