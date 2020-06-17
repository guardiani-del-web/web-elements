import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-switch-group',
  styleUrl: 'switch-group.scss',
  shadow: true,
})
export class SwitchGroup implements ComponentInterface {

  render() {
    return (
      <Host>
        <h1>we-switch-group is ready!</h1>
      </Host>
    );
  }

}
