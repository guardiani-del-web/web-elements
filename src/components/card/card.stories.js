
import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Card',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const title = text('title','Title');
  const subtitle = text('subtitle','Subtitle');
  const texts = text('bodytext','Some quick example text to build on the card title and make up the bulk of the cards content.');


  const cssVariables = getCssVariables('we-card', color, text);

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
