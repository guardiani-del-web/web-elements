import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-list',
  styleUrl: 'list.scss',
  shadow: true
})
export class List implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
