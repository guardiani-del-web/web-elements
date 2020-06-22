
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Button',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-button', color, text);

  return html`
    <we-button label="label button" value="pressed"></we-button>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
