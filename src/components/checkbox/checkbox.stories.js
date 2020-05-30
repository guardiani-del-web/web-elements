import { html } from 'lit-html';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import readmeCheckbox from "./readme.md";
import readmeCheckboxGroup from "../checkbox-group/readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Checkbox',
  parameters: {
    notes: readmeCheckbox.concat(readmeCheckboxGroup)
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const name = text('Name', 'Fruits');
  const checkbox1 = text('Label checkbox1', 'Banana');
  const checkbox2 = text('Label checkbox2', 'Apple');
  const checkbox3 = text('Label checkbox3', 'Pear');

  const checkboxHandler = value => {
    console.log('currentSelection', value);
  }

  return html`
    <we-checkbox-group name=${name} change-callback=${checkboxHandler}>
      <we-checkbox value=${checkbox1}>${checkbox1}</we-checkbox>
      <we-checkbox value=${checkbox2}>${checkbox2}</we-checkbox>
      <we-checkbox value=${checkbox3}>${checkbox3}</we-checkbox>
    </we-checkbox-group>
    <style>
      html {
        ${getCssVariables('we-checkbox', color, text)};
      }
    </style>
  `;
};