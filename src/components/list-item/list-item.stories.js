
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|ListItem',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-list-item', color, text);

  return html`
    <we-list-group>
      <we-list-item></we-list-item>
      <we-list-item></we-list-item>
      <we-list-item></we-list-item>
    </we-list-group>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
