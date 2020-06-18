
import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES, KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Switch',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-switch', color, text);
  
  const name1 = text('Switch 1', 'Switch 1', KNOBS_LIVE);
  const name2 = text('Switch 2', 'Switch 2', KNOBS_LIVE);
  const name3 = text('Switch 3', 'Switch 3', KNOBS_LIVE);
  const enabled = boolean('Enabled', false, KNOBS_LIVE);

  const switchHandler = value => {
    console.log('switchHandler', value);
  }

  return html`
  <we-switch-group>
    <we-switch name=${name1} enabled=${enabled} change-callback=${switchHandler}></we-switch>
    <we-switch name=${name2} enabled=${enabled} change-callback=${switchHandler}></we-switch>
    <we-switch name=${name3} enabled=${enabled} change-callback=${switchHandler}></we-switch>
  </we-switch-group>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
