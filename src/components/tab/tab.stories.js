
import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Tabs',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const tabsData = [
    {
      title: 'Tab 1',
      enabled: false,
      content: 'Quisque laoreet tortor et accumsan elementum. Ut bibendum mi ac justo viverra, a consequat diam tincidunt. Cras nec metus sed tortor sodales blandit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus'
    },
    {
      title: 'Tab 2',
      enabled: true,
      content: 'Aenean massa nisl, facilisis sit amet vestibulum non, faucibus ut enim. Quisque nisl magna, convallis in metus vitae, interdum consequat odio.'
    },
    {
      title: 'Tab 3',
      enabled: false,
      content: 'Vestibulum et ex efficitur, pretium diam eu, ultrices lorem. Maecenas ullamcorper mollis auctor. Nulla convallis placerat imperdiet. Curabitur at mi eget libero varius porta. Vestibulum nibh felis, cursus ullamcorper semper nec, pretium id ipsum. Nulla facilisi. Pellentesque luctus ac lacus non sagittis.'
    }
  ];

  const cssVariables = getCssVariables('we-tab', color, text);

  return html`
    <we-tab-group>
      ${tabsData.map((tab, i) => html`
        <we-tab enabled=${tab.enabled}>
          <div slot="header">${text(`Title ${i + 1}`, tab.title, KNOBS_LIVE)}</div>
          <div slot="content">
            <p>${text(`Content ${i + 1}`, tab.content, KNOBS_LIVE)}</p>
          </div>
        </we-tab>
      `)}
    </we-tab-group>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
