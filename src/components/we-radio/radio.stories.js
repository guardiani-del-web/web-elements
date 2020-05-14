import { html } from 'lit-html';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import readme from "./readme.md";

export default {
  title: 'Components|Radio',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const radio1 = text('Label radio1', 'Peru');
  const radio2 = text('Label radio2', 'Italia');
  const radio3 = text('Label radio3', 'Germany');
  const name = text('Name', 'country');
    
   const radioHandler = value => {
     console.log('currentSelection', value);
   }

  return html`
    <we-radio-group on-change=${radioHandler}>
      <we-radio name=${name} checked="true" value=${radio1}>${radio1}</we-radio>
      <we-radio name=${name} value=${radio2}>${radio2}</we-radio>
      <we-radio name=${name} value=${radio3}>${radio3}</we-radio>
    </we-radio-group>
  `;
};
