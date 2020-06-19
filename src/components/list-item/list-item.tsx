import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-list-item',
  styleUrl: 'list-item.scss',
  shadow: true
})
export class ListItem implements ComponentInterface {
  render() {
    return (
      <Host>
        <h1>we-list-item is ready!</h1>
      </Host>
    );
  }
}
