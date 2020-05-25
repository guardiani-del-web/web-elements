# we-chips



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default |
| -------------- | --------------- | ----------- | --------- | ------- |
| `isSelectable` | `is-selectable` | if true change color and trigger selectCallBack event when user click on it            | `boolean` | `false` |
| `label`        | `label`         | text in the central label            | `string`  | `""`    |
| `removeLeft`   | `remove-left`   | if true when user click on image left the chips is removed and removeCallback event is triggered           | `boolean` | `false` |
| `removeRight`  | `remove-right`  | if true when user click on image right the chips is removed and removeCallback event is triggered            | `boolean` | `false` |
| `srcImgLeft`   | `src-img-left`  | path of the left image used like src in img component, if nothing is passed img is not rendered            | `string`  | `""`    |
| `srcImgRight`  | `src-img-right` | path of the right image used like src in img component, if nothing is passed img is not rendered            | `string`  | `""`    |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `removeCallback` | event triggered when user remove chips            | `CustomEvent<any>` |
| `selectCallback` | event triggered when user select chips            | `CustomEvent<any>` |


## CSS Custom Properties

| Name                          | Description                          |
| ----------------------------- | ------------------------------------ |
| `--background`                | <br> Default: rgba(229, 229, 229, 1) |
| `--border-color`              | <br> Default: unset                  |
| `--border-radius`             | <br> Default: 0.5em                  |
| `--border-width`              | <br> Default: 0.05em                 |
| `--display`                   | <br> Default: inline-block           |
| `--heigth`                    | <br> Default: auto                   |
| `--imageLeft--border-radius`  | <br> Default: 0em                    |
| `--imageLeft--cursor`         | <br> Default: auto                   |
| `--imageLeft--heigth`         | <br> Default: auto                   |
| `--imageLeft--margin`         | <br> Default: 0 0.5rem               |
| `--imageLeft--padding`        | <br> Default: 0                      |
| `--imageLeft--width`          | <br> Default: auto                   |
| `--imageRight--border-radius` | <br> Default: 0em                    |
| `--imageRight--cursor`        | <br> Default: pointer                |
| `--imageRight--heigth`        | <br> Default: auto                   |
| `--imageRight--margin`        | <br> Default: 0 0.5rem               |
| `--imageRight--padding`       | <br> Default: 0                      |
| `--imageRight--width`         | <br> Default: auto                   |
| `--label--color`              | <br> Default: rgba(0, 0, 0, 1)       |
| `--label--font-size`          | <br> Default: 12pt                   |
| `--label--font-weight`        | <br> Default: normal                 |
| `--label--margin`             | <br> Default: 0 0.5rem               |
| `--label--padding`            | <br> Default: 0                      |
| `--label--text-align`         | <br> Default: left                   |
| `--label--text-decoration`    | <br> Default: unset                  |
| `--label--text-transform`     | <br> Default: unset                  |
| `--margin`                    | <br> Default: 0                      |
| `--padding`                   | <br> Default: 0.25rem                |
| `--selected-background`       | <br> Default: rgba(65, 169, 192, 1)  |
| `--width`                     | <br> Default: auto                   |


----------------------------------------------


