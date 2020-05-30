import {html} from 'lit-html';
import {withKnobs, text, color, boolean, number} from '@storybook/addon-knobs';
import readme from "./readme.md";
import {getCssVariables} from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES, KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Slider',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-textarea', color, text);

  const name = text('Name', 'MySlider', KNOBS_ATTRIBUTES);
  const disabled = boolean('Disabled', false, KNOBS_ATTRIBUTES);
  const value = number('value', 10, {}, KNOBS_ATTRIBUTES);
  const min = number('min', 0, {}, KNOBS_ATTRIBUTES);
  const max = number('max', 50, {}, KNOBS_ATTRIBUTES);

  const label = text('Label', 'Slider 1', KNOBS_LIVE);

  const sliderHandler = value => {
    console.log('sliderHandler', value);
  }
  
  return html`
    <we-slider name=${name} disabled=${disabled} value=${value} min=${min} max=${max} change-callback=${sliderHandler}>
      ${label}
    </we-slider>
    <style>
      html {
        ${cssVariables};
      }
    </style>
  `;
};