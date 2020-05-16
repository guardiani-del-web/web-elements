import { html } from 'lit-html';
import { withKnobs, text } from '@storybook/addon-knobs';
import readmeRadio from "./readme.md";
import readmeRadioGroup from "../we-radio-group/readme.md";

export default {
  title: 'Components|Radio',
  parameters: {
    notes: readmeRadio.concat(readmeRadioGroup)
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const radio1 = text('Label radio1', 'Peru');
  const radio2 = text('Label radio2', 'Italia');
  const radio3 = text('Label radio3', 'Germany');
  const name = text('Name', 'Country');
    
  const radioHandler = value => {
    console.log('currentSelection', value);
  }

  return html`
    <we-radio-group name=${name} change-callback=${radioHandler}>
      <we-radio checked="true" value=${radio1}>${radio1}</we-radio>
      <we-radio value=${radio2}>${radio2}</we-radio>
      <we-radio value=${radio3}>${radio3}</we-radio>
    </we-radio-group>
  `;
};
