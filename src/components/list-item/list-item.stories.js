
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|List',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-list-item', color, text);

  return html`
    <we-list>
      <we-list-item value="item 1"></we-list-item>
      <we-list-item value="item 2"></we-list-item>
      <we-list-item value="item 3"></we-list-item>
    </we-list>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
