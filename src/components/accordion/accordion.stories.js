import { html } from 'lit-html';
import { withKnobs } from '@storybook/addon-knobs';
import readmeAccordion from "./readme.md";
import readmeAccordionGroup from "../accordion-group/readme.md";

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
      <we-accordion>
        <div slot="title">Accordion 1</div>
        <div slot="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </we-accordion>
      <we-accordion>
        <div slot="title">Accordion 2</div>
        <div slot="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </we-accordion>
      <we-accordion>
        <div slot="title">Accordion 3</div>
        <div slot="content">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </we-accordion>
    </we-accordion-group>
  `;
};