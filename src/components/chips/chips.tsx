import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-chips',
  styleUrl: 'chips.scss',
  shadow: true,
})
export class Chips implements ComponentInterface {

  render() {
    return (
      <Host>
        <h1>we-chips is ready!</h1>
      </Host>
    );
  }

}
