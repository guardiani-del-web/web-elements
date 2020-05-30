# Web Elements 💎
[![Npm Version](https://img.shields.io/npm/v/web-elements.svg)](https://www.npmjs.com/package/web-elements)
[![Npm Downloads](https://img.shields.io/npm/dm/web-elements.svg)](https://www.npmjs.com/package/web-elements)
[![Publish NPM](https://github.com/guardiani-del-web/web-elements/workflows/Publish%20NPM/badge.svg?branch=master)](https://github.com/guardiani-del-web/web-elements/actions?query=workflow%3A%22Publish+NPM%22)
[![Deploy Storybook](https://github.com/guardiani-del-web/web-elements/workflows/Deploy%20Storybook/badge.svg?branch=master)](https://github.com/guardiani-del-web/web-elements/workflows/Deploy%20Storybook/badge.svg?branch=master)
[![Mit License](https://img.shields.io/npm/l/web-elements.svg)](https://github.com/grandemayta/web-elements/blob/develop/LICENSE)

<img src="./brand/cover.png" />

Web Elements is a set of components that works with any framework or library, 100% customizable using [Css Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) and 100% reusable using [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

## Getting started
### Npm

```sh
npm install --save web-elements
```

### Cdn
```html
<!DOCTYPE html>
<html>
  <body>

    <we-checkbox-group name="fruits" change-callback="checkboxHandler">
      <we-checkbox value="banana">Banana</we-checkbox>
      <we-checkbox value="apple">Apple</we-checkbox>
      <we-checkbox value="pear">Pear</we-checkbox>
    </we-checkbox-group>

    <script type="module" src="https://unpkg.com/web-elements@0.0.8/dist/web-elements/web-elements.esm.js"></script>
    <script nomodule src="https://unpkg.com/web-elements@0.0.8/dist/web-elements/web-elements.js"></script>
  </body>
</html>
```

## Demo
For more information see our project on Storybook.
[Web Elements Storybook](https://web-elements-260917.web.app)

## Browsers support

:white_check_mark: Chrome
<br/>
:white_check_mark: Firefox
<br/>
:white_check_mark: Safari
<br/>
:white_check_mark: Edge
<br/>
:white_check_mark: IE11


## Contributors ✨
Thanks goes to these wonderful people:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/grandemayta">
        <img src="https://avatars.githubusercontent.com/u/6887120?v=3" width="100px" />
        <br />
        <sub>
          <b>Gabriel Mayta</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/G1anpierre">
        <img src="https://avatars.githubusercontent.com/u/22327132?v=3" width="100px" />
        <br />
        <sub>
          <b>Gianpierre Fernandez</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/fdanise">
        <img src="https://avatars.githubusercontent.com/u/29681015?v=3" width="100px" />
        <br />
        <sub>
          <b>Ferdinando Danise</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/gsosa2000">
        <img src="https://avatars.githubusercontent.com/u/44258309?v=3" width="100px" />
        <br />
        <sub>
          <b>Gabriel Sosa</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/FAngelo94">
        <img src="https://avatars.githubusercontent.com/u/17097656?v=3" width="100px" />
        <br />
        <sub>
          <b>Angelo Falci</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

Keep calm and code!
