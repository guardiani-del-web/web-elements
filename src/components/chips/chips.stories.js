
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Chips',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-chips', color, text);

  return html`
    <we-chips src-img-left="prova" src-img-right="prova" label="ciao" remove-left=true/>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
