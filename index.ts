/// <reference lib="dom" />

/**
 * @module MetadataClient
 */

const validLayersUrl = "exts/LayerMetadata/validLayers?f=json";
const layerSourcesUrl = "exts/LayerMetadata/layerSources?f=json";
const metadataUrl = "exts/LayerMetadata/metadata";

export class ArcGisError extends Error {
  public readonly code?: number;
  /**
   *
   */
  constructor(public readonly errorInfo: IError) {
    super(errorInfo.message);
    this.code = errorInfo.code;
  }
}

export interface IError {
  [key: string]: any;
  code: number;
  message: string;
}

export interface IServiceInfo {
  [key: string]: any;
  supportedExtensions?: string;
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

export async function getLayerSources(serviceUrl: string) {
  const url = [serviceUrl, layerSourcesUrl].join("/");
  const response = await fetch(url);
  const layerSources = (await response.json()) as ILayerLayerSources;
  return layerSources;
}

/**
 * Gets URLs to unique metadata items.
 * @returns {Object.<string, string>} - Key value pairs. Keys are table names and values are metadata URLs.
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

export async function getValidLayers(
  url: string,
  checkForMetadataSupport?: boolean
) {
  const supportsMetadata = checkForMetadataSupport
    ? await detectLayerMetadataSupport(url)
    : true;
  if (!supportsMetadata) {
    return null;
  }

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


export interface ILayerLayerSources {
  [key: string]: number[];
}

