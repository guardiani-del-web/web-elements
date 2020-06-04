import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-dropdown-group',
  styleUrl: 'dropdown-group.scss',
  shadow: true,
})
export class DropdownGroup implements ComponentInterface {
  @Prop() orientation: string = "column";

  render() {
    return (
      <Host class={this.orientation}>
        <slot></slot>
      </Host>
    );
  }

}
