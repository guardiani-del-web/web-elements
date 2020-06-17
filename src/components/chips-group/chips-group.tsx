import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-chips-group',
  styleUrl: 'chips-group.scss',
  shadow: true,
})
export class ChipsGroup implements ComponentInterface {

  render() {
    return (
      <Host>
        <h1>we-chips-group is ready!</h1>
      </Host>
    );
  }

}
