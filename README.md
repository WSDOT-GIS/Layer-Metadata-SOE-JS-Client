Layer Metadata Server Object Extension JavaScript client
========================================================

[![Build Status](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)
[![bitHound Overall Score](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/score.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)
[![bitHound Dependencies](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/dependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/devDependencies.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/badges/code.svg)](https://www.bithound.io/github/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)

This project contains extensions to the [ArcGIS API for JavaScript] layer classes that allow them to call the [Layer Metadata SOE].

<a name="module_MetadataClient"></a>

## MetadataClient

* [MetadataClient](#module_MetadataClient)
    * [MetadataClient](#exp_module_MetadataClient--MetadataClient) ⏏
        * [new MetadataClient(url)](#new_module_MetadataClient--MetadataClient_new)
        * [~url](#module_MetadataClient--MetadataClient..url) : <code>string</code>
        * [~supportsMetadata](#module_MetadataClient--MetadataClient..supportsMetadata) : <code>Promise.&lt;Boolean&gt;</code>
        * [~layerSources](#module_MetadataClient--MetadataClient..layerSources) : <code>Promise.&lt;Object.&lt;string, Array.&lt;number&gt;&gt;&gt;</code>
        * [~metadataLinks](#module_MetadataClient--MetadataClient..metadataLinks) ⇒ <code>Object.&lt;string, string&gt;</code>

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

**Kind**: inner property of [<code>MetadataClient</code>](#exp_module_MetadataClient--MetadataClient)  
<a name="module_MetadataClient--MetadataClient..supportsMetadata"></a>

#### MetadataClient~supportsMetadata : <code>Promise.&lt;Boolean&gt;</code>
Tests a map service to see if it supports the Layer Metadata SOE.First call submits an HTTP request. Subsequent calls do not.Returns a promise that, when resolved, returns a boolean valueindicating if the service supports the layer metadata capability.

**Kind**: inner property of [<code>MetadataClient</code>](#exp_module_MetadataClient--MetadataClient)  
**Example**  
```js
var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");client.supportsMetadata.then(function (isSupported) {     console.log("layer does " + isSupported ? "" : "not " + "support metadata");});
```
<a name="module_MetadataClient--MetadataClient..layerSources"></a>

#### MetadataClient~layerSources : <code>Promise.&lt;Object.&lt;string, Array.&lt;number&gt;&gt;&gt;</code>
Returns list of layers that have metadata associated with them,grouped by common data source.

**Kind**: inner property of [<code>MetadataClient</code>](#exp_module_MetadataClient--MetadataClient)  
**Example**  
```js
var client = new MetadataClient("http://data.wsdot.wa.gov/arcgis/rest/services/Shared/CountyBoundaries/MapServer");client.layerSources.then(function (layerSources) {    console.debug(layerSources);}, function (error) {    console.error(error);});// Output:// {//  "GeodataExternalReplica.DBO.sr24kIncrease": [ 0, 1, 4 ],//  "GeodataExternalReplica.DBO.sr24kDecrease": [ 2 ],//  "GeodataExternalReplica.DBO.sr24kRamp": [ 3 ],//  "GeodataExternalReplica.DBO.LAPR_Lines": [ 5, 6 ]// }
```
<a name="module_MetadataClient--MetadataClient..metadataLinks"></a>

#### MetadataClient~metadataLinks ⇒ <code>Object.&lt;string, string&gt;</code>
Gets URLs to unique metadata items.

**Kind**: inner property of [<code>MetadataClient</code>](#exp_module_MetadataClient--MetadataClient)  
**Returns**: <code>Object.&lt;string, string&gt;</code> - - Key value pairs. Keys are table names and values are metadata URLs.  

Issue: Jasmine tests fails due to Promise not being defined in Visual Studio's Task Runner Explorer
---------------------------------------------------------------------------------------------------

Visual Studio is running and old version of Node.js. If you have a newer version installed you can make Visual Studio use the newer one by following these steps:

1. Go to *Tools* | *Options* | *Projects and Solutions* | *External Web Tools*.
2. Move `$(PATH)` above `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External`

[ArcGIS API for JavaScript]:http://js.arcgis.com
[Layer Metadata SOE]:https://github.com/WSDOT-GIS/LayerMetadataSoe
