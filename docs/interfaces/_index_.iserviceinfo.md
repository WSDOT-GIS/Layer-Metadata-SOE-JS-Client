[@wsdot/layer-metadata-soe-client](../README.md) > ["index"](../modules/_index_.md) > [IServiceInfo](../interfaces/_index_.iserviceinfo.md)

# Interface: IServiceInfo

Information about a map service.

## Hierarchy

**IServiceInfo**

## Indexable

\[key: `string`\]:&nbsp;`any`
Information about a map service.

## Index

### Properties

* [error](_index_.iserviceinfo.md#error)
* [supportedExtensions](_index_.iserviceinfo.md#supportedextensions)

---

## Properties

<a id="error"></a>

### `<Optional>` error

**● error**: *[IError](_index_.ierror.md)*

*Defined in [index.ts:60](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L60)*

Error information. This property will only be present if a problem has occured with a request.

___
<a id="supportedextensions"></a>

### `<Optional>` supportedExtensions

**● supportedExtensions**: * `undefined` &#124; `string`
*

*Defined in [index.ts:58](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L58)*

Comma-separated list of the names of extensions supported by a service. (Commas may also be followed by spaces)

___

