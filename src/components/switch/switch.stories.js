
import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Switch',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const switchHandler = value => {
    console.log('currentSelection', value);
  }

  const cssVariables = getCssVariables('we-switch', color, text);
  const status = boolean('Enabled', false);

  return html`
    <we-switch name="switch1" enabled=${status} change-callback=${switchHandler}></we-switch>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
