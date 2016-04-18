Layer Metadata Server Object Extension JavaScript client
========================================================

[![Build Status](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)
[![bitHound Overall Score](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/score.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)
[![bitHound Dependencies](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/dependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/devDependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/code.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)

This project contains extensions to the [ArcGIS API for JavaScript] layer classes that allow them to call the [Layer Metadata SOE].

## Modules

<dl>
<dt><a href="#module_MetadataClient">MetadataClient</a></dt>
<dd></dd>
<dt><del><a href="#module_metadataExtension">metadataExtension</a></del></dt>
<dd><p>Extends the layer classes to add methods for calling the Layer Metadata SOE.</p>
</dd>
</dl>

<a name="module_MetadataClient"></a>

## MetadataClient

* [MetadataClient](#module_MetadataClient)
    * [MetadataClient](#exp_module_MetadataClient--MetadataClient) ⏏
        * [new MetadataClient(url)](#new_module_MetadataClient--MetadataClient_new)
        * [~url](#module_MetadataClient--MetadataClient..url) : <code>string</code>
        * [~supportsMetadata](#module_MetadataClient--MetadataClient..supportsMetadata) : <code>Promise.&lt;Boolean&gt;</code>
        * [~layerSources](#module_MetadataClient--MetadataClient..layerSources) : <code>Promise.&lt;Object.&lt;string, Array.&lt;number&gt;&gt;&gt;</code>

<a name="exp_module_MetadataClient--MetadataClient"></a>

### MetadataClient ⏏
**Kind**: Exported class  
<a name="new_module_MetadataClient--MetadataClient_new"></a>

#### new MetadataClient(url)
**Throws**:

- <code>TypeError</code> thrown if no map service URL is provided.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to a map service. |

<a name="module_MetadataClient--MetadataClient..url"></a>

#### MetadataClient~url : <code>string</code>
Map service URL

**Kind**: inner property of <code>[MetadataClient](#exp_module_MetadataClient--MetadataClient)</code>  
<a name="module_MetadataClient--MetadataClient..supportsMetadata"></a>

#### MetadataClient~supportsMetadata : <code>Promise.&lt;Boolean&gt;</code>
Tests a map service to see if it supports the Layer Metadata SOE.
First call submits an HTTP request. Subsequent calls do not.
Returns a promise that, when resolved, returns a boolean value
indicating if the service supports the layer metadata capability.

**Kind**: inner property of <code>[MetadataClient](#exp_module_MetadataClient--MetadataClient)</code>  
**Example**  
```js
var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
client.supportsMetadata.then(function (isSupported) {
     console.log("layer does " + isSupported ? "" : "not " + "support metadata");
});
```
<a name="module_MetadataClient--MetadataClient..layerSources"></a>

#### MetadataClient~layerSources : <code>Promise.&lt;Object.&lt;string, Array.&lt;number&gt;&gt;&gt;</code>
Returns list of layers that have metadata associated with them,
grouped by common data source.

**Kind**: inner property of <code>[MetadataClient](#exp_module_MetadataClient--MetadataClient)</code>  
**Example**  
```js
var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");
client.layerSources.then(function (layerSources) {
    console.debug(layerSources);
}, function (error) {
    console.error(error);
});
// Output:
// {
//  "GeodataExternalReplica.DBO.sr24kIncrease": [ 0, 1, 4 ],
//  "GeodataExternalReplica.DBO.sr24kDecrease": [ 2 ],
//  "GeodataExternalReplica.DBO.sr24kRamp": [ 3 ],
//  "GeodataExternalReplica.DBO.LAPR_Lines": [ 5, 6 ]
// }
```
<a name="module_metadataExtension"></a>

## ~~metadataExtension~~
***Deprecated***

Extends the layer classes to add methods for calling the Layer Metadata SOE.


* ~~[metadataExtension](#module_metadataExtension)~~
    * ~~[.getMapServerUrl](#module_metadataExtension.getMapServerUrl) ⇒ <code>Object</code>~~
    * ~~[.getMetadataSoeRootUrl](#module_metadataExtension.getMetadataSoeRootUrl) ⇒ <code>string</code>~~
    * ~~[.getLayersWithMetadataUrl](#module_metadataExtension.getLayersWithMetadataUrl) ⇒ <code>string</code>~~
    * ~~[.getMetadataUrl](#module_metadataExtension.getMetadataUrl) ⇒ <code>Object.&lt;string, string&gt;</code>~~
    * ~~[.getIdsOfLayersWithMetadata](#module_metadataExtension.getIdsOfLayersWithMetadata) ⇒ <code>dojo/promise/Deferred.&lt;Array.&lt;number&gt;&gt;</code>~~
    * ~~[.supportsMetadata](#module_metadataExtension.supportsMetadata) ⇒ <code>Promise.&lt;Boolean&gt;</code>~~

<a name="module_metadataExtension.getMapServerUrl"></a>

### ~~metadataExtension.getMapServerUrl ⇒ <code>Object</code>~~
***Deprecated***

Examines a layer (or a layer URL) and returns the map service url and layer id parts as properties in the returned object.

**Kind**: static property of <code>[metadataExtension](#module_metadataExtension)</code>  
**Returns**: <code>Object</code> - An object with the properties mapServerUrl and layerId.  mapServerUrl is the url to the map server (without any layerIDs).  layerId is the layer ID portion of the URL.  If the URL did not contain a layerID, this property will have a value of null.  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>string</code> &#124; <code>[Layer](https://developers.arcgis.com/javascript/jsapi/layer-amd.html)</code> | Either a map service or map service layer URL, or an external:Layer object. |

<a name="module_metadataExtension.getMetadataSoeRootUrl"></a>

### ~~metadataExtension.getMetadataSoeRootUrl ⇒ <code>string</code>~~
***Deprecated***

Given an external:Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE root page.

**Kind**: static property of <code>[metadataExtension](#module_metadataExtension)</code>  
**Returns**: <code>string</code> - The URL to the SOE root.  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>string</code> &#124; <code>[Layer](https://developers.arcgis.com/javascript/jsapi/layer-amd.html)</code> | Either a map service or map service layer URL, or an external:Layer object. |

<a name="module_metadataExtension.getLayersWithMetadataUrl"></a>

### ~~metadataExtension.getLayersWithMetadataUrl ⇒ <code>string</code>~~
***Deprecated***

Given an external:Layer object or a layer URL, returns the URL for a query to the Layer Metadata SOE for a list of valid layer IDs.

**Kind**: static property of <code>[metadataExtension](#module_metadataExtension)</code>  
**Returns**: <code>string</code> - The URL to a query for a list of valid layers.  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>string</code> &#124; <code>[Layer](https://developers.arcgis.com/javascript/jsapi/layer-amd.html)</code> | Either a map service or map service layer URL, or an external:Layer object. |

<a name="module_metadataExtension.getMetadataUrl"></a>

### ~~metadataExtension.getMetadataUrl ⇒ <code>Object.&lt;string, string&gt;</code>~~
***Deprecated***

Returns the Layer Metadata SOE URL to retrieve the metadata for a map service feature layer.

**Kind**: static property of <code>[metadataExtension](#module_metadataExtension)</code>  
**Returns**: <code>Object.&lt;string, string&gt;</code> - - Returns an object with a "mapServerUrl" property.  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>string</code> &#124; <code>[Layer](https://developers.arcgis.com/javascript/jsapi/layer-amd.html)</code> | Either a map service or map service layer URL, or an external:Layer object. |
| [sublayerId] | <code>Number</code> | If the URL provided via the layer parameter does not contain a layer ID, this parameter must be used to supply one.  If the URL already has a layer ID, this parameter will be ignored. |

<a name="module_metadataExtension.getIdsOfLayersWithMetadata"></a>

### ~~metadataExtension.getIdsOfLayersWithMetadata ⇒ <code>dojo/promise/Deferred.&lt;Array.&lt;number&gt;&gt;</code>~~
***Deprecated***

Calls the SOE to get the list of layer IDs that correspond to feature layers.

**Kind**: static property of <code>[metadataExtension](#module_metadataExtension)</code>  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>string</code> &#124; <code>[Layer](https://developers.arcgis.com/javascript/jsapi/layer-amd.html)</code> | Either a map service or map service layer URL, or an external:Layer object. |
| Event | <code>function</code> | handler function that is called when the query is successful.  Parameter "data" is an array of integers. |
| Event | <code>function</code> | handler function that is called when the query fails.  Parameter "error" is an Error. |

<a name="module_metadataExtension.supportsMetadata"></a>

### ~~metadataExtension.supportsMetadata ⇒ <code>Promise.&lt;Boolean&gt;</code>~~
***Deprecated***

Tests to see if a layer supports metadata.

**Kind**: static property of <code>[metadataExtension](#module_metadataExtension)</code>  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - - Returns a promise. When resolved, a boolean value indicates if the layer supports metadata.  

| Param | Type | Description |
| --- | --- | --- |
| layer | <code>[Layer](https://developers.arcgis.com/javascript/jsapi/layer-amd.html)</code> | Either a map service or map service layer URL, or an external:Layer object. |
| successHandler | <code>function</code> | Function that is called when metadata is supported. |
| failHandler | <code>function</code> | Function that is called when metadata is not supported. |


Issue: Jasmine tests fails due to Promise not being defined in Visual Studio's Task Runner Explorer
---------------------------------------------------------------------------------------------------

Visual Studio is running and old version of Node.js. If you have a newer version installed you can make Visual Studio use the newer one by following these steps:

1. Go to *Tools* | *Options* | *Projects and Solutions* | *External Web Tools*.
2. Move `$(PATH)` above `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External`

[ArcGIS API for JavaScript]:http://js.arcgis.com
[Layer Metadata SOE]:https://github.com/WSDOT-GIS/LayerMetadataSoe
