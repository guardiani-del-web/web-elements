import { html } from 'lit-html';
import { withKnobs } from '@storybook/addon-knobs';
import readmeAccordion from "./readme.md";
import readmeAccordionGroup from "../we-accordion-group/readme.md";

export default {
  title: 'Components|Accordion',
  parameters: {
    notes: readmeAccordion.concat(readmeAccordionGroup)
  },
  decorators: [withKnobs],
};

export const Basic = () => {
  return html`
    <we-accordion-group>
      <we-accordion title="Accordion 1">
       Accordion 1
      </we-accordion>
      <we-accordion title="Accordion 2">
       Accordion 2
      </we-accordion>
    </we-accordion-group>
  `;
};