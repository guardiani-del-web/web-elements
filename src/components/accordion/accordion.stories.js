import { html } from 'lit-html';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import readmeAccordion from "./readme.md";
import readmeAccordionGroup from "../accordion-group/readme.md";
import { getCssVariables } from '../../utils/getCssVariables';
import { KNOBS_ATTRIBUTES, KNOBS_LIVE } from '../../../.storybook/constants';

export default {
  title: 'Components|Accordion',
  parameters: {
    notes: readmeAccordion.concat(readmeAccordionGroup)
  },
  decorators: [withKnobs]
};

export const Basic = () => {
  const accordionData = [
    {
      title: 'Lorem ipsum dolor sit amet',
      content: 'Maecenas id finibus massa, mattis blandit nunc. Maecenas a turpis at massa viverra volutpat lacinia sit amet neque.'
    },
    {
      title: 'Nulla sodales nunc eu lorem',
      content: 'Curabitur in commodo velit, congue interdum nisi. Morbi congue purus elit, non tincidunt eros lobortis at. Nulla a odio ligula.'
    },
    {
      title: 'Etiam fringilla mi in lectus',
      content: 'Nulla eget tincidunt dui. Maecenas aliquet nec velit ut mattis. Nulla sagittis ligula in ex placerat lacinia. Praesent ac dui quis augue sollicitudin dictum sit amet cursus neque. Sed posuere libero at lobortis semper.'
    },
  ]
  
  const cssVariables = getCssVariables('we-accordion', color, text);

  const multiple = boolean('Multiple', false, KNOBS_ATTRIBUTES);
  const open = boolean('Open', false, KNOBS_ATTRIBUTES);
  
  return html`
    <we-accordion-group multiple=${multiple}>
      ${accordionData.map((accordion, i) => html`
        <we-accordion open=${i === 1 ? open : false}>
          <div slot="title">${text(`Title ${i + 1}`, accordion.title, KNOBS_LIVE)}</div>
          <div slot="content">${text(`Content ${i + 1}`, accordion.content, KNOBS_LIVE)}</div>
        </we-accordion>
      `)}
    </we-accordion-group>
    <style>
      html {
        ${cssVariables};
      }
    </style>
  `;
};