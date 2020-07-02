# we-dropdown-item



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                     | Type     | Default     |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `arrow`            | `arrow`             | Arrow direction when dropdown is opened/closed inserted in this way: ["arrow_closed","arrow_opened"], values accepted: right, left, up, down                                                    | `string` | `undefined` |
| `borderClass`      | `border-class`      | Prop update from dropdown group depend on the orientation the dropdown item is put in order to draw a line separation between them                                                              | `string` | `undefined` |
| `height`           | `height`            | Height of the children container when is opened/closed, insert it if you want a transition of height in this way: ["height_close", "height_open"], usually the height_close is 0                | `string` | `undefined` |
| `label`            | `label`             | Text inside the dropdown item if you want to use a simple dropdown item with only text                                                                                                          | `string` | `undefined` |
| `positionChildren` | `position-children` | In which position you want put children relative to the parent dropdown item: right, left, bottom, top <br> Choosen the position you can also modify the css variables that define the position | `string` | `'right'`   |
| `value`            | `value`             | Value put in payload of event triggered when dropdown item is clicked                                                                                                                           | `string` | `undefined` |
| `width`            | `width`             | Width of the children container when is opened/closed, insert it if you want a transition of width in this way: ["width_close", "width_open"], usually the width_close is 0                     | `string` | `undefined` |


## Events

| Event               | Description                                                  | Type               |
| ------------------- | ------------------------------------------------------------ | ------------------ |
| `clickItemCallback` | Event triggered when dropdown item is clicked, not the arrow | `CustomEvent<any>` |


----------------------------------------------


