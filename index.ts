/// <reference lib="dom" />

/**
 * @package @wsdot/layer-metadata-soe-client
 */

/** @ignore */
const validLayersUrl = "exts/LayerMetadata/validLayers?f=json";
/** @ignore */
const layerSourcesUrl = "exts/LayerMetadata/layerSources?f=json";
/** @ignore */
const metadataUrl = "exts/LayerMetadata/metadata";

/**
 * An error returned from an ArcGIS service.
 * @example
 * // Inside async function
 * const response = await fetch("https://www.example.com/ArcGIS/rest/services/MyService/query?invalidOption=thisisinvalid");
 * const obj = await response.json();
 * if (obj.error) {
 *  throw new ArcGisError(obj.error);
 * }
 */
export class ArcGisError extends Error {
  /**
   * Error code
   */
  public readonly code?: number;
  /**
   * Creates a new instance of ArcGisError.
   * @param errorInfo - The "error" property of the response object returned from a failed ArcGIS Server request.
   */
  constructor(public readonly errorInfo: IError) {
    super(errorInfo.message);
    this.code = errorInfo.code;
  }
}

/**
 * Error information object returned from a bad ArcGIS service request.
 */
export interface IError {
  [key: string]: any;
  /** Status code */
  code: number;
  /** text description of error */
  message: string;
}

/**
 * Information about a map service.
 */
export interface IServiceInfo {
  [key: string]: any;
  /**
   * Comma-separated list of the names of extensions supported by a service. (Commas may also be followed by spaces)
   */
  supportedExtensions?: string;
  /** Error information. This property will only be present if a problem has occured with a request. */
  error?: IError;
}

/**
 * Gets map service info
 * @param serviceUrl map service URL.
 * @throws {ArcGisError}
 */
export async function getServiceInfo(
  serviceUrl: string
): Promise<IServiceInfo> {
  const response = await fetch([serviceUrl, "f=json"].join("?"));
  const serviceInfo = (await response.json()) as IServiceInfo;
  if (serviceInfo.error) {
    throw new ArcGisError(serviceInfo.error);
  }
  return serviceInfo;
}

/**
 * Detects if a map service supports the "LayerMetadata" capability.
 * @param serviceUrl Map or Feature service URL.
 * @throws {ArcGisError}
 */
export async function detectLayerMetadataSupport(serviceUrl: string) {
  const serviceInfo = await getServiceInfo(serviceUrl);
  if (!serviceInfo.supportedExtensions) {
    return false;
  }
  return /LayerMetadata/.test(serviceInfo.supportedExtensions);
}

/**
 * Gets a list of data sources
 * @param serviceUrl Map service URL
 * @returns An object keyed by data set names with values that are layer ID integers associated with those datasets.
 */
export async function getLayerSources(serviceUrl: string) {
  const url = [serviceUrl, layerSourcesUrl].join("/");
  const response = await fetch(url);
  const layerSources = (await response.json()) as ILayerLayerSources;
  return layerSources;
}

/**
 * Gets URLs to unique metadata items.
 * @param url map service URL
 * @param layerSources If you have already called getLayerSources, you can pass in the results here to avoid making a duplicate request.
 * @returns Key value pairs. Keys are table names and values are metadata URLs.
 */
export async function getMetadataLinks(
  url: string,
  layerSources?: ILayerLayerSources
) {
  if (!layerSources) {
    layerSources = await getLayerSources(url);
  }

  const requestUrl = [url, metadataUrl].join("/");
  const output: { [key: string]: string } = {};
  // tslint:disable-next-line:forin
  for (const key in layerSources) {
    output[key] = [requestUrl, layerSources[key][0]].join("/");
  }
  return output;
}

/**
 * Gets a list of valid layer IDs
 * @param url Map service URL
 * @throws {ArcGisError} Thrown if the map service returns an error.
 * @throws {TypeError} Thrown if HTTP request returns an object in unexpected format.
 */
export async function getValidLayers(url: string) {
  const requestUrl = [url, validLayersUrl].join("/");
  const response = await fetch(requestUrl);
  const obj = await response.json();
  if (obj.layerIds) {
    return obj.layerIds as number[];
  } else if (obj.error) {
    throw new ArcGisError(obj.error);
  } else {
    throw new TypeError(
      `response was not expected type: ${JSON.stringify(obj)}`
    );
  }
}

/**
 * A mapping of data sources to layer ID integers.
 */
export interface ILayerLayerSources {
  [key: string]: number[];
}
