import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-textarea',
  shadow: true,
})
export class Textarea implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
