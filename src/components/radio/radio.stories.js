import { html } from 'lit-html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import readmeRadio from "./readme.md";
import readmeRadioGroup from "../radio-group/readme.md";
import { KNOBS_ATTRIBUTES, KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Radio',
  parameters: {
    notes: readmeRadio.concat(readmeRadioGroup)
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const value = text('Name', 'Country', KNOBS_ATTRIBUTES);
  const checked = boolean('Checked', true, KNOBS_ATTRIBUTES);
  const disabled = boolean('Disabled', false, KNOBS_ATTRIBUTES);

  const radio1 = text('Label radio1', 'Peru', KNOBS_LIVE);
  const radio2 = text('Label radio2', 'Italia', KNOBS_LIVE);
  const radio3 = text('Label radio3', 'Germany', KNOBS_LIVE);
    
  const radioHandler = value => {
    console.log('radioHandler', value);
  }

  window.addEventListener('radioGroupCallback', (data) => console.log("radioGroupCallback listen",data.detail));

  return html`
    <we-radio-group value=${value}>
      <we-radio value=${radio1}>${radio1}</we-radio>
      <we-radio checked=${checked} disabled=${disabled} value=${radio2}>${radio2}</we-radio>
      <we-radio value=${radio3}>${radio3}</we-radio>
    </we-radio-group>
  `;
};
