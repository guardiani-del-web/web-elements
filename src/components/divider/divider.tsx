import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-divider',
  shadow: true,
})
export class Divider implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
