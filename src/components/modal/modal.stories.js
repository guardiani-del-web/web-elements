
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Modal',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-modal', color, text);

  return html`
    <we-modal>
    <div>Slot Example</div>
    </we-modal>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
