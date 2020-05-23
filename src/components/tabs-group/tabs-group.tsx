import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-tabs-group',
  shadow: true,
})
export class TabsGroup implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
