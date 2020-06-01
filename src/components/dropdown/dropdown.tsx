import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-dropdown',
  styleUrl: 'dropdown.scss',
  shadow: true,
})
export class Dropdown implements ComponentInterface {

  render() {
    return (
      <Host>
        <h1>we-dropdown is ready!</h1>
      </Host>
    );
  }

}
