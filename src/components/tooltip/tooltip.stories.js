import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readme from './readme.md';
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Tooltip',
  parameters: {
    notes: readme
  },
  decorators: [withKnobs]
};

export const Basic = () => {
  const cssVariables = getCssVariables('we-tooltip', color, text);

  return html`
    <we-tooltip>
      <div slot="reference"> Put on this container to see the tooltip </div>
      <div slot="tooltip"> 
      <label>Complex</label>
      </br>
      <label>Tooltip</label>
      </div>
    </we-tooltip>

    </br></br></br>

    <we-tooltip value="simple tooltip">
    <label slot="reference" > Put on this container to see the tooltip </label>
    </we-tooltip>

    <style>
      html {
        ${cssVariables}
      }
    </style>
  `;
};
