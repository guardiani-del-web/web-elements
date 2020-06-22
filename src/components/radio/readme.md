# we-radio

```html
<we-radio-group change-callback=myFuncion>
  <we-radio name="country" checked="true" value="pe">Peru</we-radio>
  <we-radio name="country" value="it">Italia</we-radio>
  <we-radio name="country" value="de">Germany</we-radio>
</we-radio-group>
```
<br>

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                                                | Type      | Default     |
| -------------------- | ---------- | -------------------------------------------------------------------------- | --------- | ----------- |
| `checked`            | `checked`  | identify if this radio button is checked or not when the page is loaded    | `boolean` | `undefined` |
| `disabled`           | `disabled` | Identify if this radio button is disabled or not                           | `boolean` | `undefined` |
| `value` _(required)_ | `value`    | Value returned when the input is submitted if this radio button is checked | `string`  | `undefined` |


## Events

| Event           | Description                                                                                        | Type               |
| --------------- | -------------------------------------------------------------------------------------------------- | ------------------ |
| `radioCallback` | Event triggered when this radio button is checked/not checked returning the value prop for payload | `CustomEvent<any>` |


----------------------------------------------


