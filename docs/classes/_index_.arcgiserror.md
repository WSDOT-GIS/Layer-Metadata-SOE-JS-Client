[@wsdot/layer-metadata-soe-client](../README.md) > ["index"](../modules/_index_.md) > [ArcGisError](../classes/_index_.arcgiserror.md)

# Class: ArcGisError

An error returned from an ArcGIS service.
*__example__*: // Inside async function const response = await fetch("[https://www.example.com/ArcGIS/rest/services/MyService/query?invalidOption=thisisinvalid")](https://www.example.com/ArcGIS/rest/services/MyService/query?invalidOption=thisisinvalid")); const obj = await response.json(); if (obj.error) { throw new ArcGisError(obj.error); }

## Hierarchy

 `Error`

**↳ ArcGisError**

## Index

### Constructors

* [constructor](_index_.arcgiserror.md#constructor)

### Properties

* [code](_index_.arcgiserror.md#code)
* [errorInfo](_index_.arcgiserror.md#errorinfo)
* [message](_index_.arcgiserror.md#message)
* [name](_index_.arcgiserror.md#name)
* [stack](_index_.arcgiserror.md#stack)
* [Error](_index_.arcgiserror.md#error)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ArcGisError**(errorInfo: *[IError](../interfaces/_index_.ierror.md)*): [ArcGisError](_index_.arcgiserror.md)

*Defined in [index.ts:28](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L28)*

Creates a new instance of ArcGisError.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| errorInfo | [IError](../interfaces/_index_.ierror.md) |  The "error" property of the response object returned from a failed ArcGIS Server request. |

**Returns:** [ArcGisError](_index_.arcgiserror.md)

___

## Properties

<a id="code"></a>

### `<Optional>` code

**● code**: * `undefined` &#124; `number`
*

*Defined in [index.ts:28](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L28)*

Error code

___
<a id="errorinfo"></a>

###  errorInfo

**● errorInfo**: *[IError](../interfaces/_index_.ierror.md)*

*Defined in [index.ts:33](https://github.com/WSDOT-GIS/Layer-Metadata-SOE-JS-Client/blob/6f27df2/index.ts#L33)*

The "error" property of the response object returned from a failed ArcGIS Server request.

___
<a id="message"></a>

###  message

**● message**: *`string`*

*Inherited from Error.message*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:904*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Inherited from Error.name*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:903*

___
<a id="stack"></a>

### `<Optional>` stack

**● stack**: * `undefined` &#124; `string`
*

*Inherited from Error.stack*

*Overrides Error.stack*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:905*

___
<a id="error"></a>

### `<Static>` Error

**● Error**: *`ErrorConstructor`*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:914*

___

