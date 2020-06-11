# we-checkbox

```html
<we-checkbox-group name="fruits" change-callback=checkboxHandler>
  <we-checkbox value="banana">Banana</we-checkbox>
  <we-checkbox value="apple">Apple</we-checkbox>
  <we-checkbox value="pear">Pear</we-checkbox>
</we-checkbox-group>
```
<br>
<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                                            | Type      | Default     |
| -------------------- | ---------- | ---------------------------------------------------------------------- | --------- | ----------- |
| `checked`            | `checked`  | identify if this checkbox is checked or not when the page is loaded    | `boolean` | `undefined` |
| `disabled`           | `disabled` | Identify if this checkbox is disabled or not                           | `boolean` | `undefined` |
| `value` _(required)_ | `value`    | Value returned when the input is submitted if this checkbox is checked | `string`  | `undefined` |


## Events

| Event              | Description                                                                                    | Type               |
| ------------------ | ---------------------------------------------------------------------------------------------- | ------------------ |
| `checkboxCallback` | Event triggered when this checkbox is checked/not checked returning the value prop for payload | `CustomEvent<any>` |


----------------------------------------------


