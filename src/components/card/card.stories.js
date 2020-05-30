
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Card',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-card', color, text);
  
  const title = text('title', 'Title', KNOBS_LIVE);
  const subtitle = text('subtitle', 'Subtitle', KNOBS_LIVE);
  const texts = text('text', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', KNOBS_LIVE);

  return html`
    <we-card>
      <div slot="title">${title}</div>
      <div slot="subtitle">${subtitle}</div>
      <div slot="texts">${texts}</div>
    </we-card>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
