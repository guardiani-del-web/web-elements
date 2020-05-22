
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Textarea',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-textarea', color, text);

  return html`
    <we-textarea></we-textarea>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
