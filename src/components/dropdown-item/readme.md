# we-dropdown-item



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                     | Type     | Default     |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `arrow`            | `arrow`             | Arrow direction when dropdown is opened/closed inserted in this way: ["arrow_closed","arrow_opened"], values accepted: right, left, up, down                                                    | `string` | `undefined` |
| `borderClass`      | `border-class`      | Prop update from dropdown group depend on the orientation the dropdown item is put in order to draw a line separation between them                                                              | `string` | `undefined` |
| `height`           | `height`            | Height of the children container when is opened/closed, insert it if you want a transition of height in this way: ["height_close", "height_open"], usually the height_close is 0                | `string` | `undefined` |
| `label`            | `label`             | Text inside the dropdown item if you want to use a simple dropdown item with only text                                                                                                          | `string` | `undefined` |
| `positionChildren` | `position-children` | In which position you want put children relative to the parent dropdown item: right, left, bottom, top <br> Choosen the position you can also modify the css variables that define the position | `string` | `"right"`   |
| `value`            | `value`             | Value put in payload of event triggered when dropdown item is clicked                                                                                                                           | `string` | `undefined` |
| `width`            | `width`             | Width of the children container when is opened/closed, insert it if you want a transition of width in this way: ["width_close", "width_open"], usually the width_close is 0                     | `string` | `undefined` |


## Events

| Event               | Description                                                  | Type               |
| ------------------- | ------------------------------------------------------------ | ------------------ |
| `clickItemCallback` | Event triggered when dropdown item is clicked, not the arrow | `CustomEvent<any>` |


## CSS Custom Properties

| Name                     | Description                                                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--align-items`          | Align items inside dropdown item <br> Default: center                                                                                                                                        |
| `--arrow--border`        | Border of dropdown item arrow <br> Default: solid rgba(0, 0, 0, 1)                                                                                                                           |
| `--arrow--border-width`  | Border width of dropdown item arrow <br> Default: 0 0.1875em 0.1875em 0                                                                                                                      |
| `--arrow--display`       | Display of dropdown item arrow <br> Default: inline-block                                                                                                                                    |
| `--arrow--padding`       | Padding of dropdown item arrow <br> Default: 0.1875em                                                                                                                                        |
| `--arrow--transition`    | Transition of dropdown item arrow <br> Default: all 0.5s                                                                                                                                     |
| `--background`           | Background of dropdown item <br> Default: rgba(255, 255, 255, 1)                                                                                                                             |
| `--background-hover`     | Background of dropdown item when user go on hover with mouse <br> Default: rgb(185, 185, 185)                                                                                                |
| `--border-bottom`        | Border bottom of item in a column dropdown group<br> Default: solid 0.125em rgba(0, 0, 0, 1)                                                                                                 |
| `--border-right`         | Border right of item in a row dropdown group <br> Default: solid 0.125em rgba(0, 0, 0, 1)                                                                                                    |
| `--children--bottom`     | Bottom property of dropdown item children, the default value depend of the position class choosen for the children (default class, position_left, not used this property) <br> Default: 100% |
| `--children--left`       | Left property of dropdown item children, the default value depend of the position class choosen for the children (default class, position_left, not used this property) <br> Default: 100%   |
| `--children--position`   | Position of dropdown item children, not change it to default behaviour <br> Default: absolute                                                                                                |
| `--children--right`      | Right property of dropdown item children, the default value depend of the position class choosen for the children (default value indicated is for left class) <br> Default: 100%             |
| `--children--top`        | Top property of dropdown item children, the default value depend of the position class choosen for the children (default value indicated is for left class) <br> Default: -0.125em           |
| `--children--transition` | Transition of dropdown item children <br> Default: all 0.5s                                                                                                                                  |
| `--color`                | Color of dropdown item <br> Default: rgba(0, 0, 0, 1)                                                                                                                                        |
| `--cursor`               | Cursor inside dropdown item <br> Default: pointer                                                                                                                                            |
| `--display`              | Display of dropdown item <br> Default: flex                                                                                                                                                  |
| `--height`               | Height of dropdown item <br> Default: 1.875em                                                                                                                                                |
| `--justify-content`      | Justify content inside dropdown item <br> Default: space-between                                                                                                                             |
| `--margin`               | Margin of dropdown item <br> Default: 0                                                                                                                                                      |
| `--padding`              | Padding of dropdown item <br> Default: 0.625em                                                                                                                                               |
| `--width`                | Width of dropdown item <br> Default: 12.5em                                                                                                                                                  |


----------------------------------------------


