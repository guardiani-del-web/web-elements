import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-list-group',
  styleUrl: 'list-group.scss',
  shadow: true
})
export class ListGroup implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
