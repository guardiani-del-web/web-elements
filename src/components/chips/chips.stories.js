
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

  const nameGroup = text('nameGroup', 'chipsGroup', KNOBS_ATTRIBUTES);

  const removeLeft = boolean('removeLeft', true, KNOBS_ATTRIBUTES);

  const isSelectable = boolean('isSelectable', true, KNOBS_LIVE);

  const image1 = text('Image left', 'https://via.placeholder.com/15', KNOBS_LIVE);
  const image2 = text('Image right', 'https://via.placeholder.com/15', KNOBS_LIVE);
  const label = text('Label', 'Apple', KNOBS_LIVE);

  const value1 = text('Value', 'chip 1', KNOBS_LIVE);
  const value2 = text('Value', 'chip 2', KNOBS_LIVE);
  const value3 = text('Value', 'chip 3', KNOBS_LIVE);


  const selectCallback = value => {
    console.log('selectCallback', value);
  }

  const removeCallback = value => {
    console.log('removeCallback', value);
  }

  return html`
    <we-chips-group name=${nameGroup} select-callback=${selectCallback} remove-callback=${removeCallback}>
      <we-chips value=${value1} src-img-left=${image1} src-img-right=${image2} label=${label} remove-left=${removeLeft} is-selectable=${isSelectable}/>
      <we-chips value=${value2} src-img-left=${image1} src-img-right=${image2} label=${label} remove-left=${removeLeft} is-selectable=${isSelectable}/>
      <we-chips value=${value3} src-img-left=${image1} src-img-right=${image2} label=${label} remove-left=${removeLeft} is-selectable=${isSelectable}/>
      <we-chips-group />
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
