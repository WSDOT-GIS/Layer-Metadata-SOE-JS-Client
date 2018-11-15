Layer Metadata Server Object Extension JavaScript client
========================================================

This package provides functions for calling the [Layer Metadata SOE].

[![npm version](https://img.shields.io/npm/v/@wsdot/layer-metadata-soe-client.svg?style=flat-square)](https://www.npmjs.org/package/@wsdot/layer-metadata-soe-client)
[![npm license](https://img.shields.io/npm/l/@wsdot/layer-metadata-soe-client.svg?style=flat-square)](https://www.npmjs.org/package/@wsdot/layer-metadata-soe-client)
[![npm donwloads](https://img.shields.io/npm/dm/@wsdot/layer-metadata-soe-client.svg?style=flat-square)](https://www.npmjs.org/package/@wsdot/layer-metadata-soe-client)
[![Build Status](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client.svg?branch=master)](https://travis-ci.org/WSDOT-GIS/Layer-Metadata-SOE-JS-Client)

Usage
-----

Install with the following command.

```sh
npm install @wsdot/layer-metadata-soe-client
```

See the [API documentation](./docs/README.md) for detailed information.

### TypeScript Example

```TypeScript
import { detectLayerMetadataSupport, getMetadataLinks, ArcGisError } from "@wsdot/layer-metadata-soe-client"

/**
 * Create HTML lists of metadata documents for map service layer data sources.
 * @returns a document fragment containing lists and headings.
 */
async function createMetadataList (url: string) {
    const isSupported = await detectLayerMetadataSupport(url);
    if (!isSupported) {
        const msg = `Service does not support LayerMetadata SOE: ${url}`;
        throw new Error(msg);
    }

    try {
        const metadataLinks = await getMetadataLinks(url);
        const frag = document.createDocumentFragment();
        for (const dataName in metadataLinks) {
            const heading = document.createElement("h2");
            heading.textContent = dataName;
            frag.appendChild(heading);
            if (metadataLinks.hasOwnProperty(dataName)) {
                const linkUrls = metadataLinks[dataName];
                const list = document.createElement("ul");
                for (const linkUrl of linkUrls) {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.href = linkUrl;
                    a.textContent = linkUrl;
                    a.target = "_blank";
                    li.appendChild(a);
                    list.appendChild(li);
                }
                frag.appendChild(list);
            }
        }
        return frag;
    } catch (error) {
        if (error instanceof ArcGisError) {
            console.error(`The service returned an error message. ${error.code}: ${error.message}`);
        }
        throw error;
    }
}

// Specify the map service
const url = "https://example.com/ArcGIS/services/MyService/MapServer";
// Call the async function and handle success and error conditions.
createMetadataList(url).then(frag => {
    // Append the document fragment to the document body.
    document.body.appendChild(frag);
}, error => {
    // log the error to the console.
    console.error("list creation error", error);
})
```

[ArcGIS API for JavaScript]:http://js.arcgis.com
[Layer Metadata SOE]:https://github.com/WSDOT-GIS/LayerMetadataSoe
