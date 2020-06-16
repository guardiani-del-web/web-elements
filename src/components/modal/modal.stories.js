
import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES, KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Modal',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-modal', color, text);

  const isVisible = boolean('isVisible', true, KNOBS_LIVE);

  const label = text('Label', 'Slot Example', KNOBS_LIVE);

  return html`
    <we-modal isVisible=${isVisible}>
    <div>${label}</div>
    </we-modal>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
