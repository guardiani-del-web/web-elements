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

export const Basic = () => {
  return html`
    <we-slider value=10 min=0 max=50 onSliderChange={console.log($event)}>Slider 1</we-slider>
    <style>
      html {
        ${getCssVariables('we-slider', color, text)};
      }
    </style>
  `;
};

