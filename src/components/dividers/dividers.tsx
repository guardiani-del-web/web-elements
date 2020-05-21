import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-dividers',
  shadow: true,
})
export class Dividers implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
