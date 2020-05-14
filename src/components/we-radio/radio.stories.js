import { html } from 'lit-html';
import { withKnobs } from '@storybook/addon-knobs';
import readme from "./readme.md";

export default {
  title: 'Components|Radio',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  return html`
    <we-radio-group>
      <we-radio name="sex" value="female">Female</we-radio>
      <we-radio name="sex" value="male">Male</we-radio>
    </we-radio-group>
  `;
};