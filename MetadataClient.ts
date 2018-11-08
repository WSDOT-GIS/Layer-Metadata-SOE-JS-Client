/// <reference lib="dom" />

/**
 * @module MetadataClient
 */

let validLayersUrl = "exts/LayerMetadata/validLayers?f=json";
let layerSourcesUrl = "exts/LayerMetadata/layerSources?f=json";
let metadataUrl = "exts/LayerMetadata/metadata";

/**
 * Determines if an array contains a specific string.
 * @param {string[]} a - An array
 * @param {string} s - a string
 * @returns {Boolean} - Returns true if it does, false if it doesn't.
 */
function arrayContainsString(a: string[], s: string) {
  let output = false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === s) {
      output = true;
      break;
    }
  }
  return output;
}

export interface ILayerLayerSources {
    [key: string]: number[];
}

export default class MeatadataClient {
  public readonly url: string;
  // tslint:disable-next-line:variable-name
  private _supportsMetadata: boolean | undefined;
  // tslint:disable-next-line:variable-name
  private _layerSources: ILayerLayerSources | null | undefined;
  /**
   * @member {string} - Map service URL
   */

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
  public get supportsMetadata(): Promise<boolean> {
    if (typeof this._supportsMetadata === "boolean") {
      return new Promise(() => this._supportsMetadata);
    }
    return fetch(this.url + "?f=json")
      .then(response => response.json())
      .then(serviceInfo => {
        const supportedExtensions =
          serviceInfo && serviceInfo.supportedExtensions
            ? serviceInfo.supportedExtensions.split(/[,\s]+/)
            : null;
        this._supportsMetadata =
          Array.isArray(supportedExtensions) &&
          arrayContainsString(supportedExtensions, "LayerMetadata");
        return this._supportsMetadata;
      });
  }



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
  public get layerSources(): Promise<ILayerLayerSources> {
    if (this._layerSources !== undefined) {
      return new Promise(() => this._layerSources);
    }
    const self = this;
    return this.supportsMetadata.then(isSupported => {
      const requestUrl = [this.url, layerSourcesUrl].join("/");

      if (!isSupported) {
        return false;
      } else {
        return fetch(requestUrl).then(response => {
          return response.json().then(ls => {
            self._layerSources = ls;
            return ls;
          })
        });
      }
    });
  }
  /**
   * Gets URLs to unique metadata items.
   * @returns {Object.<string, string>} - Key value pairs. Keys are table names and values are metadata URLs.
   */
  public get metadataLinks(): Promise<{ [key: string]: string }> {
    const { url } = this;
    return this.layerSources.then(layerSources => {
      const requestUrl = [url, metadataUrl].join("/");
      const output: any = {};
      // tslint:disable-next-line:forin
      for (const key in layerSources) {
        output[key] = [requestUrl, layerSources[key][0]].join("/");
      }
      return output;
    });
  }
  public get validLayers() {
    const { url } = this;
    return this.supportsMetadata.then(supportsMetadata => {
      const requestUrl = [url, validLayersUrl].join("/");
      if (supportsMetadata) {
        return fetch(requestUrl).then(response => {
          return response.json();
        });
      } else {
        return null;
      }
    });
  }

  /**
   * @alias module:MetadataClient
   * @constructor
   * @param {string} url - URL to a map service.
   * @throws {TypeError} thrown if no map service URL is provided.
   */
  constructor(url: string | { [key: string]: any; url: string }) {
    if (typeof url === "object" && url.url) {
      url = url;
    }
    if (!url) {
      throw new TypeError("No map service URL provided.");
    }
    // Remove trailing slash from URL if present and assign to property.
    this.url = (url as string).replace(/\/$/, "");
  }
}
