
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|NavigationDrawer',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-navigation-drawer', color, text);

  return html`
    <we-navigation-drawer closed="false">
    <h2>Title</h2>
    <div style="width: 12.5em;">Option 1</div>
    <div style="width: 12.5em;">Option 2</div>
    <div style="width: 12.5em;">Option 3</div>
    </we-navigation-drawer>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
