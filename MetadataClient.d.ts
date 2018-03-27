/**
 * @module MetadataClient
 */

/**
 * @alias module:MetadataClient
 * @constructor
 * @param {string} url - URL to a map service.
 * @throws {TypeError} thrown if no map service URL is provided.
 */
declare class MetadataClient {
  /**
   * @member {string} - Map service URL
   */
  public url: string;
  constructor(url: string);
  /**
   * @member {Promise.<Boolean>} - Tests a map service to see if it supports the Layer Metadata SOE.
   * First call submits an HTTP request. Subsequent calls do not.
   * Returns a promise that, when resolved, returns a boolean value
   * indicating if the service supports the layer metadata capability.
   * @example
   * var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
   * client.supportsMetadata.then(function (isSupported) {
   *      console.log("layer does " + isSupported ? "" : "not " + "support metadata");
   * });
   */
  public readonly supportsMetadata: Promise<Boolean>;
  /**
   * @member {Promise.<Object.<string, number[]>>} - Returns list of layers that have metadata associated with them,
   * grouped by common data source.
   * @example
   * var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
   * client.layerSources.then(function (layerSources) {
   *     console.debug(layerSources);
   * }, function (error) {
   *     console.error(error);
   * });
   * // Output:
   * // {
   * //  "GeodataExternalReplica.DBO.sr24kIncrease": [ 0, 1, 4 ],
   * //  "GeodataExternalReplica.DBO.sr24kDecrease": [ 2 ],
   * //  "GeodataExternalReplica.DBO.sr24kRamp": [ 3 ],
   * //  "GeodataExternalReplica.DBO.LAPR_Lines": [ 5, 6 ]
   * // }
   */
  public readonly layerSources: Promise<{ [key: string]: number[] }>;
  /**
   * Gets URLs to unique metadata items.
   * @returns {Object.<string, string>} - Key value pairs. Keys are table names and values are metadata URLs.
   */
  public readonly metadataLinks: {[key: string]: string}

  /**
   * Gets an object listing the valid data.
   */
  public readonly validLayers: Promise<any | null>;
}
