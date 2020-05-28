import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-card',
  styleUrl: 'card.scss',
  shadow: true,
})
export class Card implements ComponentInterface {

  render() {
    return (
      <Host>
        <h1>we-card is ready!</h1>
      </Host>
    );
  }

}
