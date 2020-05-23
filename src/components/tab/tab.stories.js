
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Tabs',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-tab', color, text);

  return html`
    <we-tab-group>
      <we-tab enabled="true">
        <div slot="header">Features</div>
        <div slot="content">
          <h3>Features</h3>
          <p>There really are a lot of features.</p>
        </div>
      </we-tab>
      <we-tab>
        <div slot="header">History</div>
        <div slot="content">
          <h3>History</h3>
          <p>The project started in 2018 when someone needed something.</p>
        </div>
      </we-tab>
      <we-tab>
        <div slot="header">Reviews</div>
        <div slot="content">
          <h3>Reviews</h3>
          <p>Amazing product. I don't know how it works.</p>
        </div>
      </we-tab>
    </we-tab-group>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
