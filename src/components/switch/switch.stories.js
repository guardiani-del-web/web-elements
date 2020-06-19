
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
  
  const nameGroup = text('nameGroup', 'nameGroup', KNOBS_LIVE);

  const name1 = text('Switch 1', 'Switch 1', KNOBS_LIVE);
  const name2 = text('Switch 2', 'Switch 2', KNOBS_LIVE);
  const name3 = text('Switch 3', 'Switch 3', KNOBS_LIVE);
  const checked = boolean('checked', false, KNOBS_LIVE);

  const switchHandler = value => {
    console.log('switchHandler', value);
  }

  return html`
  <we-switch-group name=${nameGroup} change-switch-callback=${switchHandler}>
    <we-switch name=${name1} checked=${checked}></we-switch>
    <we-switch name=${name2} checked=${checked}></we-switch>
    <we-switch name=${name3} checked=${checked}></we-switch>
  </we-switch-group>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
