
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Dropdown',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-dropdown', color, text);

  return html`
    <we-dropdown></we-dropdown>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
