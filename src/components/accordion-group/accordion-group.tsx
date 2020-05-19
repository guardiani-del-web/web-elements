import { ComponentInterface, Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-accordion-group',
  shadow: true,
})
export class AccordionGroup implements ComponentInterface {
  @Prop() multiple: boolean;

  render() {
    return (
      <slot></slot>
    );
  }

}
