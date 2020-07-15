
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
  
  const valueGroup = text('valueGroup', 'valueGroup', KNOBS_LIVE);

  const value1 = text('Switch 1', 'Switch 1', KNOBS_LIVE);
  const value2 = text('Switch 2', 'Switch 2', KNOBS_LIVE);
  const value3 = text('Switch 3', 'Switch 3', KNOBS_LIVE);
  const checked = boolean('checked', false, KNOBS_LIVE);

  window.addEventListener('switchGroupCallback', (data) => console.log("switchGroupCallback listener",data));

  return html`
  <we-switch-group value=${valueGroup}>
    <we-switch value=${value1} checked=${checked}></we-switch>
    <we-switch value=${value2} checked=${checked}></we-switch>
    <we-switch value=${value3} checked=${checked}></we-switch>
  </we-switch-group>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
