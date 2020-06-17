# we-chips



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                         | Type      | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `isSelectable` | `is-selectable` | If true user can select the chips and selectCallback event is triggered                                             | `boolean` | `undefined` |
| `label`        | `label`         | Center text written inside the chips if you want a text inside the chips                                            | `string`  | `undefined` |
| `removeLeft`   | `remove-left`   | If true the chips will be removed when user click on left image inside chips and removeCallback event is triggered  | `boolean` | `undefined` |
| `removeRight`  | `remove-right`  | If true the chips will be removed when user click on right image inside chips and removeCallback event is triggered | `boolean` | `undefined` |
| `srcImgLeft`   | `src-img-left`  | Src of img you want to put in left side of chips if you want an image in that position                              | `string`  | `undefined` |
| `srcImgRight`  | `src-img-right` | Src of img you want to put in right side of chips if you want an image in that position                             | `string`  | `undefined` |
| `value`        | `value`         | Value passed on event when chips selected or removed                                                                | `string`  | `undefined` |


## Events

| Event            | Description                                | Type               |
| ---------------- | ------------------------------------------ | ------------------ |
| `removeCallback` | Event triggered when the chips is removed  | `CustomEvent<any>` |
| `selectCallback` | Event triggered when the chips is selected | `CustomEvent<any>` |


----------------------------------------------


