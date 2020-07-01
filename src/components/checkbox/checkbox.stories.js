import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readmeCheckbox from './readme.md';
import readmeCheckboxGroup from '../checkbox-group/readme.md';
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES, KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Checkbox',
  parameters: {
    notes: readmeCheckbox.concat(readmeCheckboxGroup)
  },
  decorators: [withKnobs]
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-checkbox', color, text);

  const name = text('Name', 'Fruits', KNOBS_ATTRIBUTES);
  const checked = boolean('Checked', true, KNOBS_ATTRIBUTES);
  const disabled = boolean('Disabled', false, KNOBS_ATTRIBUTES);

  const checkbox1 = text('Label checkbox1', 'Banana', KNOBS_LIVE);
  const checkbox2 = text('Label checkbox2', 'Apple', KNOBS_LIVE);
  const checkbox3 = text('Label checkbox3', 'Pear', KNOBS_LIVE);

  window.addEventListener('checkboxGroupCallback', (data) => console.log("checkboxGroupCallback",data));

  return html`
    <we-checkbox-group value=${name}>
      <we-checkbox value=${checkbox1}>${checkbox1}</we-checkbox>
      <we-checkbox checked=${checked} disabled=${disabled} value=${checkbox2}>${checkbox2}</we-checkbox>
      <we-checkbox value=${checkbox3}>${checkbox3}</we-checkbox>
    </we-checkbox-group>
    <style>
      html {
        ${cssVariables};
      }
    </style>
  `;
};
