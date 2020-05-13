import { html } from 'lit-html';
import { withKnobs, text, boolean, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Checkbox',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const label = text('Label', 'Banana');
  const checked = boolean('Checked', false);
  const disabled = boolean('Disabled', false);

  return html`
    <we-checkbox checked=${checked} disabled=${disabled} value="Banana">
      ${label}
    </we-checkbox>
    <style>
      html {
        ${getCssVariables('we-checkbox', color, text)};
      }
    </style>
  `;
};