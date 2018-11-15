Layer Metadata Server Object Extension JavaScript client
========================================================

[![Build Status](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)

This project contains extensions to the [ArcGIS API for JavaScript] layer classes that allow them to call the [Layer Metadata SOE].

<a name="module_MetadataClient"></a>

## MetadataClient

* [MetadataClient](#module_MetadataClient)
    * [~getServiceInfo(serviceUrl)](#module_MetadataClient..getServiceInfo)
    * [~detectLayerMetadataSupport(serviceUrl)](#module_MetadataClient..detectLayerMetadataSupport)
    * [~getMetadataLinks()](#module_MetadataClient..getMetadataLinks) ⇒ <code>Object.&lt;string, string&gt;</code>

<a name="module_MetadataClient..getServiceInfo"></a>

### MetadataClient~getServiceInfo(serviceUrl)
Gets map service info

**Kind**: inner method of [<code>MetadataClient</code>](#module_MetadataClient)  
**Throws**:

- <code>ArcGisError</code> 


| Param | Description |
| --- | --- |
| serviceUrl | map service URL. |

<a name="module_MetadataClient..detectLayerMetadataSupport"></a>

### MetadataClient~detectLayerMetadataSupport(serviceUrl)
Detects if a map service supports the "LayerMetadata" capability.

**Kind**: inner method of [<code>MetadataClient</code>](#module_MetadataClient)  
**Throws**:

- <code>ArcGisError</code> 


| Param | Description |
| --- | --- |
| serviceUrl | Map or Feature service URL. |

<a name="module_MetadataClient..getMetadataLinks"></a>

### MetadataClient~getMetadataLinks() ⇒ <code>Object.&lt;string, string&gt;</code>
Gets URLs to unique metadata items.

**Kind**: inner method of [<code>MetadataClient</code>](#module_MetadataClient)  
**Returns**: <code>Object.&lt;string, string&gt;</code> - - Key value pairs. Keys are table names and values are metadata URLs.  

[ArcGIS API for JavaScript]:http://js.arcgis.com
[Layer Metadata SOE]:https://github.com/WSDOT-GIS/LayerMetadataSoe
