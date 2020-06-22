# we-accordion

```html
<we-accordion-group>
  <we-accordion>
    <div slot="title">Accordion 1</div>
    <div slot="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  </we-accordion>
    <we-accordion>
    <div slot="title">Accordion 2</div>
    <div slot="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  </we-accordion>
  <we-accordion>
    <div slot="title">Accordion 3</div>
    <div slot="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </div>
  </we-accordion>
</we-accordion-group>
```
<br>


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                             | Type      | Default     |
| -------- | --------- | --------------------------------------- | --------- | ----------- |
| `open`   | `open`    | Indentify if accordion is opened of not | `boolean` | `undefined` |


## Events

| Event               | Description                                              | Type               |
| ------------------- | -------------------------------------------------------- | ------------------ |
| `accordionCallback` | Event triggered each time the accordion is opened/closed | `CustomEvent<any>` |


## CSS Custom Properties

| Name                           | Description                                                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `--container-background`       | Container background <br> Default: #fff                                                                                |
| `--container-box-shadow`       | Container shadow <br> Default: 0 -0.063rem 0 #e5e5e5, 0 0 0.125rem rgba(0,0,0,.12), 0 0.125rem 0.25rem rgba(0,0,0,.24) |
| `--container-height`           | Container height <br> Default: 3.375rem                                                                                |
| `--container-position`         | Container position <br> Default: relative                                                                              |
| `--container-transition`       | Container transition <br> Default: all .15s ease-in-out                                                                |
| `--content-color`              | Content color <br> Default: rgba(0,0,0,.54)                                                                            |
| `--content-font-size`          | Content font size <br> Default: 0.938rem                                                                               |
| `--content-padding`            | Content padding <br> Default: 1.25rem                                                                                  |
| `--content-width`              | Content width <br> Default: calc(100% - 2.5rem)                                                                        |
| `--icon-bottom`                | Icon bottom <br> Default: initial                                                                                      |
| `--icon-color`                 | Icon color <br> Default: rgba(0,0,0,.54)                                                                               |
| `--icon-content`               | Icon content <br> Default: '\203a'                                                                                     |
| `--icon-display`               | Icon display <br> Default: block                                                                                       |
| `--icon-font-size`             | Icon font size <br> Default: 1.5rem                                                                                    |
| `--icon-left`                  | Icon left <br> Default: initial                                                                                        |
| `--icon-position`              | Icon position <br> Default: absolute                                                                                   |
| `--icon-right`                 | Icon right <br> Default: 1.25rem                                                                                       |
| `--icon-top`                   | Icon top <br> Default: -0.125rem                                                                                       |
| `--icon-transform`             | Icon color <br> Default: rotate(0deg)                                                                                  |
| `--icon-transition`            | Icon transition <br> Default: transform .15s ease-in-out                                                               |
| `--title-border-bottom-opened` | Title border bottom opened <br> Default: 0.063rem solid rgba(0,0,0,.18)                                                |
| `--title-cursor`               | Title cursor <br> Default: pointer                                                                                     |
| `--title-display`              | Title display <br> Default: inline-block                                                                               |
| `--title-height`               | Title height <br> Default: 3.375rem                                                                                    |
| `--title-line-height`          | Title line height <br> Default: 3.375rem                                                                               |
| `--title-padding`              | Title padding <br> Default: 0 2.75rem 0 1.25rem                                                                        |
| `--title-transform-opened`     | Title transform opened <br> Default: rotate(90deg)                                                                     |
| `--title-user-select`          | Title user select <br> Default: none                                                                                   |
| `--title-width`                | Title width <br> Default: calc(100% - 4rem)                                                                            |


----------------------------------------------


