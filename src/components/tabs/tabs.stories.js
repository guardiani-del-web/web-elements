
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Tabs',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-tabs', color, text);

  return html`
    <we-tabs></we-tabs>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
