/**
 * This JS file extends the esri.layer.Layers class to provide functions that work with
 * WSDOT's Layer Metadata Server Object Extension (SOE).
 */

import lang = require("dojo/_base/lang");
import request = require("esri/request");
import ready = require("dojo/ready");
import Layer = require("esri/layers/layer");
import DynamicMapServiceLayer = require("esri/layers/DynamicMapServiceLayer");
import ArcGISTiledMapServiceLayer = require("esri/layers/ArcGISTiledMapServiceLayer");
import FeatureLayer = require("esri/layers/FeatureLayer");
import MetadataClient = require("./MetadataClient");

export = {
  /**
   * Examines a layer (or a layer URL) and returns the map service url and layer id parts as properties in the returned object.
   * @param {string|external:Layer} layer Either a map service or map service layer URL, or an external:Layer object.
   * @returns {Object} An object with the properties mapServerUrl and layerId.  mapServerUrl is the url to the map server (without any layerIDs).  layerId is the layer ID portion of the URL.  If the URL did not contain a layerID, this property will have a value of null.
   * @deprecated
   */
  getMapServerUrl: (layer: string | Layer) => any,
  /**
   * Given an external:Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE root page.
   * @param {string|external:Layer} layer Either a map service or map service layer URL, or an external:Layer object.
   * @returns {string} The URL to the SOE root.
   * @deprecated
   */
  getMetadataSoeRootUrl: (layer: string | Layer) => string,
  /**
   * Given an external:Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE for a list of valid layer IDs.
   * @param {string|external:Layer} layer Either a map service or map service layer URL, or an external:Layer object.
   * @returns {string} The URL to a query for a list of valid layers.
   * @deprecated
   */
  getLayersWithMetadataUrl: (layer: string | Layer) => string,
  /**
   * Returns the Layer Metadata SOE URL to retrieve the metadata for a map service feature layer.
   * @param {string|external:Layer} layer Either a map service or map service layer URL, or an external:Layer object.
   * @param {Number} [sublayerId] If the URL provided via the layer parameter does not contain a layer ID, this parameter must be used to supply one.  If the URL already has a layer ID, this parameter will be ignored.
   * @returns {Object.<string, string>} - Returns an object with a "mapServerUrl" property.
   * @deprecated
   */
  getMetadataUrl: (layer: string | Layer) => any,
  /**
   * Calls the SOE to get the list of layer IDs that correspond to feature layers.
   * @param {string|external:Layer} layer Either a map service or map service layer URL,
   * or an external:Layer object.
   * @param {Function} Event handler function that is called when the query is successful.
   * Parameter "data" is an array of integers.
   * @param {Function} Event handler function that is called when the query fails.
   * Parameter "error" is an Error.
   * @returns {dojo/promise/Deferred.<number[]>}
   * @deprecated
   */
  getIdsOfLayersWithMetadata: (
    layer: string | Layer,
    success: (data: number[]) => any,
    failure: (error: Error) => any
  ) => any,
  /**
   * Tests to see if a layer supports metadata.
   * @param {external:Layer} layer - Either a map service or map service layer URL, or an external:Layer object.
   * @param {function} successHandler - Function that is called when metadata is supported.
   * @param {function} failHandler - Function that is called when metadata is not supported.
   * @returns {Promise.<Boolean>} - Returns a promise. When resolved, a boolean value indicates if the layer supports metadata.
   * @deprecated
   */
  supportsMetadata: (
      layer: Layer,
      successHandler: (supportsMetadata: bool) => any,
      failHandler: (error: Error) => any
    ) => Promise<boolean>()
}
