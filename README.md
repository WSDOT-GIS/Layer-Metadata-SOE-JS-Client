Layer Metadata Server Object Extension JavaScript client
========================================================

This project contains extensions to the [ArcGIS API for JavaScript] layer classes that allow them to call the [Layer Metadata SOE].

## Files ##

### metadataExtensions.js ####

This JavaScript file extends the layer classes to add methods for calling the Layer Metadata SOE.

### unittest.html ####

QUnit unit test for metadataExtensions.


#### Unit Test Setup #####

1. Copy `unittest.js.sample` to `unittest.js`.  (`unittest.js` is in the `.gitignore` file, so it will not be pushed to the repository.)
2. Modify the url variable in `unittest.js` so that it points to a map service that has the _Layer Metadata_ capability enabled.

## License ##
This program is licensed under [The MIT license]

[ArcGIS API for JavaScript]:http://js.arcgis.com
[Layer Metadata SOE]:https://github.com/WSDOT-GIS/LayerMetadataSoe
[The MIT license]:http://www.opensource.org/licenses/MIT
