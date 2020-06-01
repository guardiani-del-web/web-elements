import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-dropdown-group',
  styleUrl: 'dropdown-group.scss',
  shadow: true,
})
export class DropdownGroup implements ComponentInterface {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
