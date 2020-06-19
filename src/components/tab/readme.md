# we-tab

```html
<we-tab-group>
  <we-tab>
    <div slot="header">Tab 1</div>
    <div slot="content">
      <h3>Tab 1</h3>
        <p>There really are a lot of features.</p>
    </div>
    </we-tab>
    <we-tab>
    <div slot="header">Tab 2</div>
    <div slot="content">
        <h3>Tab 2</h3>
        <p>The project started in 2018 when someone needed something.</p>
    </div>
    </we-tab>
    <we-tab>
    <div slot="header">Tab 3</div>
    <div slot="content">
        <h3>Tab 3</h3>
        <p>Amazing product. I don't know how it works.</p>
    </div>
    </we-tab>
</we-tab-group>
```
<br>



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                     | Type      | Default     |
| --------- | --------- | ------------------------------------------------------------------------------- | --------- | ----------- |
| `enabled` | `enabled` | Default value of tab (opened/closed) when component is triggered the first time | `boolean` | `undefined` |


## Events

| Event         | Description                                                                          | Type               |
| ------------- | ------------------------------------------------------------------------------------ | ------------------ |
| `tabCallback` | Event triggered when user select a tab putting in the payload the value id generated | `CustomEvent<any>` |


## Slots

| Slot        | Description          |
| ----------- | -------------------- |
| `"content"` | Slot for the content |
| `"header"`  | Slot for the title   |


## CSS Custom Properties

| Name                         | Description                                           |
| ---------------------------- | ----------------------------------------------------- |
| `--enabled-background-color` | Enabled background color height <br> Default: #3F51B5 |
| `--enabled-height`           | Enabled height <br> Default: 0.125rem                 |
| `--enabled-tab-color`        | Enabled tab color <br> Default: #D7DCDF               |
| `--enabled-top`              | Enabled top <br> Default: 2.125rem                    |
| `--hover-color`              | Hover color <br> Default: #ccc                        |
| `--hover-height`             | Hover height <br> Default: 0.125rem                   |
| `--label-background-color`   | Label background <br> Default: #FFFFFF                |
| `--label-color`              | Label color <br> Default: #212121                     |
| `--label-font-size`          | Label font size <br> Default: 1rem                    |
| `--label-height`             | Label height <br> Default: 2.25rem                    |
| `--label-line-height`        | Label line height <br> Default: 2.25rem               |
| `--label-text-align`         | Label text align <br> Default: center                 |


----------------------------------------------


