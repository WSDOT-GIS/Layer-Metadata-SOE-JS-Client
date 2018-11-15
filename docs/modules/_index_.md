[@wsdot/layer-metadata-soe-client](../README.md) > ["index"](../modules/_index_.md)

# External module: "index"

*__package__*: @wsdot/layer-metadata-soe-client

## Index

### Classes

* [ArcGisError](../classes/_index_.arcgiserror.md)

### Interfaces

* [IError](../interfaces/_index_.ierror.md)
* [ILayerLayerSources](../interfaces/_index_.ilayerlayersources.md)
* [IServiceInfo](../interfaces/_index_.iserviceinfo.md)

### Functions

* [detectLayerMetadataSupport](_index_.md#detectlayermetadatasupport)
* [getLayerSources](_index_.md#getlayersources)
* [getMetadataLinks](_index_.md#getmetadatalinks)
* [getServiceInfo](_index_.md#getserviceinfo)
* [getValidLayers](_index_.md#getvalidlayers)

---

## Functions

<a id="detectlayermetadatasupport"></a>

###  detectLayerMetadataSupport

▸ **detectLayerMetadataSupport**(serviceUrl: *`string`*): `Promise`<`boolean`>

*Defined in [index.ts:84](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L84)*

Detects if a map service supports the "LayerMetadata" capability.
*__throws__*: {ArcGisError}

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| serviceUrl | `string` |  Map or Feature service URL. |

**Returns:** `Promise`<`boolean`>

___
<a id="getlayersources"></a>

###  getLayerSources

▸ **getLayerSources**(serviceUrl: *`string`*): `Promise`<[ILayerLayerSources](../interfaces/_index_.ilayerlayersources.md)>

*Defined in [index.ts:97](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L97)*

Gets a list of data sources

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| serviceUrl | `string` |  Map service URL |

**Returns:** `Promise`<[ILayerLayerSources](../interfaces/_index_.ilayerlayersources.md)>
An object keyed by data set names with values that are layer ID integers associated with those datasets.

___
<a id="getmetadatalinks"></a>

###  getMetadataLinks

▸ **getMetadataLinks**(url: *`string`*, layerSources?: *[ILayerLayerSources](../interfaces/_index_.ilayerlayersources.md)*): `Promise`<`object`>

*Defined in [index.ts:110](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L110)*

Gets URLs to unique metadata items.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| url | `string` |  map service URL |
| `Optional` layerSources | [ILayerLayerSources](../interfaces/_index_.ilayerlayersources.md) |  If you have already called getLayerSources, you can pass in the results here to avoid making a duplicate request. |

**Returns:** `Promise`<`object`>
Key value pairs. Keys are table names and values are metadata URLs.

___
<a id="getserviceinfo"></a>

###  getServiceInfo

▸ **getServiceInfo**(serviceUrl: *`string`*): `Promise`<[IServiceInfo](../interfaces/_index_.iserviceinfo.md)>

*Defined in [index.ts:68](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L68)*

Gets map service info
*__throws__*: {ArcGisError}

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| serviceUrl | `string` |  map service URL. |

**Returns:** `Promise`<[IServiceInfo](../interfaces/_index_.iserviceinfo.md)>

___
<a id="getvalidlayers"></a>

###  getValidLayers

▸ **getValidLayers**(url: *`string`*): `Promise`<`number`[]>

*Defined in [index.ts:133](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L133)*

Gets a list of valid layer IDs
*__throws__*: {ArcGisError} Thrown if the map service returns an error.

*__throws__*: {TypeError} Thrown if HTTP request returns an object in unexpected format.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| url | `string` |  Map service URL |

**Returns:** `Promise`<`number`[]>

___

