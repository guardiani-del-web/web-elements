
import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES } from '../../../.storybook/constants';

export default {
  title: 'Components|Switch',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-switch', color, text);
  
  const name = text('Name', 'MySwitch', KNOBS_ATTRIBUTES);
  const enabled = boolean('Enabled', false, KNOBS_ATTRIBUTES);

  const switchHandler = value => {
    console.log('switchHandler', value);
  }

  return html`
    <we-switch name=${name} enabled=${enabled} change-callback=${switchHandler}></we-switch>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
