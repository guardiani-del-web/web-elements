
import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES, KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Chips',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-chips', color, text);

  const removeLeft = boolean('removeLeft', true, KNOBS_ATTRIBUTES);

  const image1 = text('Image left', 'https://via.placeholder.com/15', KNOBS_LIVE);
  const image2 = text('Image right', 'https://via.placeholder.com/15', KNOBS_LIVE);
  const label = text('Label', 'Apple', KNOBS_LIVE);


  return html`
    <we-chips src-img-left=${image1} src-img-right=${image2} label=${label} remove-left=${removeLeft}/>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
