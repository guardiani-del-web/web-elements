import { ComponentInterface, Component, h, Host } from '@stencil/core';

@Component({
  tag: 'we-divider',
  shadow: true,
  styleUrl: 'divider.scss'
})
export class Divider implements ComponentInterface {
  render() {
    return (
      <Host>
        <div class="line" />
      </Host>
    );
  }
}
