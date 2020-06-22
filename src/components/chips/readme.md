# we-chips



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute       | Description                                                                                                              | Type      | Default     |
| -------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `isSelectable`       | `is-selectable` | If true user can select the chips and selectChipsCallback event is triggered                                             | `boolean` | `undefined` |
| `label`              | `label`         | Center text written inside the chips if you want a text inside the chips                                                 | `string`  | `undefined` |
| `removeLeft`         | `remove-left`   | If true the chips will be removed when user click on left image inside chips and removeChipsCallback event is triggered  | `boolean` | `undefined` |
| `removeRight`        | `remove-right`  | If true the chips will be removed when user click on right image inside chips and removeChipsCallback event is triggered | `boolean` | `undefined` |
| `srcImgLeft`         | `src-img-left`  | Src of img you want to put in left side of chips if you want an image in that position                                   | `string`  | `undefined` |
| `srcImgRight`        | `src-img-right` | Src of img you want to put in right side of chips if you want an image in that position                                  | `string`  | `undefined` |
| `value` _(required)_ | `value`         | Value passed on event when chips selected or removed                                                                     | `string`  | `undefined` |


## Events

| Event                 | Description                                | Type               |
| --------------------- | ------------------------------------------ | ------------------ |
| `removeChipsCallback` | Event triggered when the chips is removed  | `CustomEvent<any>` |
| `selectChipsCallback` | Event triggered when the chips is selected | `CustomEvent<any>` |


## CSS Custom Properties

| Name                          | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| `--background`                | Background of chips <br> Default: rgba(229, 229, 229, 1)              |
| `--border-color`              | Border color of chips <br> Default: unset                             |
| `--border-radius`             | Border radius of chips <br> Default: 0.5em                            |
| `--border-width`              | Border width of chips <br> Default: 0.05em                            |
| `--display`                   | Display of chips <br> Default: inline-block                           |
| `--heigth`                    | Height of chips <br> Default: auto                                    |
| `--imageLeft--border-radius`  | Border radius of image left <br> Default: 0em                         |
| `--imageLeft--cursor`         | Cursor type of image left <br> Default: auto                          |
| `--imageLeft--heigth`         | Height of image left <br> Default: auto                               |
| `--imageLeft--margin`         | Margin of image left <br> Default: 0 0.5rem                           |
| `--imageLeft--padding`        | Padding of image left <br> Default: 0                                 |
| `--imageLeft--width`          | Width of image left <br> Default: auto                                |
| `--imageRight--border-radius` | Border radius of image right <br> Default: 0em                        |
| `--imageRight--cursor`        | Cursor type of image right <br> Default: pointer                      |
| `--imageRight--heigth`        | Height of image right <br> Default: auto                              |
| `--imageRight--margin`        | Margin of image right <br> Default: 0 0.5rem                          |
| `--imageRight--padding`       | Padding of image right <br> Default: 0                                |
| `--imageRight--width`         | Width of image right <br> Default: auto                               |
| `--label--color`              | Color of text label <br> Default: rgba(0, 0, 0, 1)                    |
| `--label--font-size`          | Font size of label <br> Default: 12pt                                 |
| `--label--font-weight`        | Font weight of label <br> Default: normal                             |
| `--label--margin`             | Margin of label <br> Default: 0 0.5rem                                |
| `--label--padding`            | Padding of label <br> Default: 0                                      |
| `--label--text-align`         | Text align of label <br> Default: left                                |
| `--label--text-decoration`    | Text decoration of label <br> Default: unset                          |
| `--label--text-transform`     | Text trasform of label <br> Default: unset                            |
| `--margin`                    | Margin of chips <br> Default: 0                                       |
| `--padding`                   | Padding of chips <br> Default: 0.25rem                                |
| `--selected-background`       | Background of chips when selected <br> Default: rgba(65, 169, 192, 1) |
| `--width`                     | Width of chips <br> Default: auto                                     |


----------------------------------------------


