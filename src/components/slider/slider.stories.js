import {html} from 'lit-html';
import {withKnobs, text, color} from '@storybook/addon-knobs';
import readme from "./readme.md";
import {getCssVariables} from '../../utils/getCssVariables';

export default {
  title: 'Components|Slider',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

const sliderHandler = value => {
  console.log('currentSelection', value);
}

export const Basic = () => {
  return html`
    <we-slider value=10 min=0 max=50 slider-callback=${sliderHandler}>Slider 1</we-slider>
    <style>
      html {
        ${getCssVariables('we-slider', color, text)};
      }
    </style>
  `;
};

