Layer Metadata Server Object Extension JavaScript client
========================================================

This project contains extensions to the [ArcGIS API for JavaScript] layer classes that allow them to call the [Layer Metadata SOE].

## Files ##

### metadataExtensions.js ####

This JavaScript file extends the layer classes to add methods for calling the Layer Metadata SOE.

### unittest.html ####

QUnit unit test for metadataExtensions.

## Running the unit test ##

A URL to a map service should be provided via the `url` query string parameter. If this parameter is not provided a form will be shown on the page instead of the tests where you can enter this URL.

## License ##
This program is licensed under [The MIT license]

[ArcGIS API for JavaScript]:http://js.arcgis.com
[Layer Metadata SOE]:https://github.com/WSDOT-GIS/LayerMetadataSoe
[The MIT license]:http://www.opensource.org/licenses/MIT
