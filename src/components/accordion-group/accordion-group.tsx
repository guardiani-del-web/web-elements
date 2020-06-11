import { ComponentInterface, Component, h, Prop, Listen, Element } from '@stencil/core';

@Component({
  tag: 'we-accordion-group',
  shadow: true
})
export class AccordionGroup implements ComponentInterface {
  /** Identify if this accordion group contains more accordions or only once */
  @Prop() multiple: boolean;
  @Element() el: HTMLWeAccordionGroupElement;

  @Listen('accordionCallback')
  accordionCallbackHandler(event: CustomEvent) {
    const value = event.detail;

    if (!this.multiple) {
      const accordions = this.el.querySelectorAll('we-accordion');

      accordions.forEach((accordion) => {
        if (accordion.getAttribute('data-id') === value) {
          accordion.setAttribute('open', 'true');
        } else {
          accordion.setAttribute('open', 'false');
        }
      });
    }
  }

  render() {
    return <slot></slot>;
  }
}
