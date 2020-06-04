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
      <Host>
        <div class={"dropdown_group " + this.orientation}>
        <slot></slot>
        </div>
      </Host>
    );
  }

}
