
import { html } from 'lit-html';
import { withKnobs, text, color, boolean, number } from '@storybook/addon-knobs';
import readme from "./readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES } from '../../../.storybook/constants';

export default {
  title: 'Components|Textarea',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-textarea', color, text);

  const name = text('Name', 'MyTextArea', KNOBS_ATTRIBUTES);
  const disabled = boolean('Disabled', false, KNOBS_ATTRIBUTES);
  const placeholder = text('Placeholder', 'Placeholder here...', KNOBS_ATTRIBUTES);
  const maxLength = number('Max Length', 10, {}, KNOBS_ATTRIBUTES);

  return html`
    <we-textarea name=${name} disabled=${disabled} placeholder=${placeholder} maxLength=${maxLength}></we-textarea>
    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
