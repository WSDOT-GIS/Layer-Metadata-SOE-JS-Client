Layer Metadata Server Object Extension JavaScript client
========================================================

This project contains extensions to the [ArcGIS API for JavaScript] layer classes that allow them to call the [Layer Metadata SOE].

metadataSoeUtils
----------------

### Issue: Jasmine tests fails due to Promise not being defined in Visual Studio's Task Runner Explorer ###

Visual Studio is running and old version of Node.js. If you have a newer version installed you can make Visual Studio use the newer one by following these steps:

1. Go to Tools | Options | Projects and Solutions | External Web Tools.
2. Move `$(PATH)` above `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External`

## Files ##

### metadataExtensions.js ####

This JavaScript file extends the layer classes to add methods for calling the Layer Metadata SOE.

### unittest.html ####

QUnit unit test for metadataExtensions.

## Running the unit test ##

A URL to a map service should be provided via the `url` query string parameter. If this parameter is not provided a form will be shown on the page instead of the tests where you can enter this URL.

[ArcGIS API for JavaScript]:http://js.arcgis.com
[Layer Metadata SOE]:https://github.com/WSDOT-GIS/LayerMetadataSoe
