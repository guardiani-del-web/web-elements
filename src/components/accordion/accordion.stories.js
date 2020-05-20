import { html } from 'lit-html';
import { withKnobs, text, color } from '@storybook/addon-knobs';
import readmeAccordion from "./readme.md";
import readmeAccordionGroup from "../accordion-group/readme.md";
import { getCssVariables } from '../../utils/getCssVariables';

export default {
  title: 'Components|Accordion',
  parameters: {
    notes: readmeAccordion.concat(readmeAccordionGroup)
  },
  decorators: [withKnobs],
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
  
  return html`
    <we-accordion-group>
      ${accordionData.map((accordion, i) => html`
        <we-accordion>
          <div slot="title">${text(`Title ${i + 1}`, accordion.title)}</div>
          <div slot="content">${text(`Content ${i + 1}`, accordion.content)}</div>
        </we-accordion>
      `)}
    </we-accordion-group>
    <style>
      html {
        ${getCssVariables('we-accordion', color, text)};
      }
    </style>
  `;
};