import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-radio',
  styleUrl: 'we-radio.css',
  shadow: true,
})
export class WeRadio {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
