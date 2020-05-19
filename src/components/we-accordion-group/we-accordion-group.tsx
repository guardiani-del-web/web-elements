import { ComponentInterface, Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-accordion-group',
  shadow: true,
})
export class WeAccordionGroup implements ComponentInterface {
  @Prop() multiple: boolean;

  render() {
    return (
      <div class="tabs">
        <slot></slot>
      </div>
    );
  }

}
