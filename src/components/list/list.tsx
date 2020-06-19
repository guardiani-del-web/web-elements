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
        <h1>we-list is ready!</h1>
      </Host>
    );
  }
}
