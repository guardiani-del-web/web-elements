import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-card',
  styleUrl: 'card.scss',
  shadow: true
})
export class Card implements ComponentInterface {
  render() {
    return (
      <Host>
        <div class="card-body">
          <h5 class="card-body__title">
            <slot name="title" />
          </h5>
          <h6 class="card-body__subtitle">
            <slot name="subtitle" />
          </h6>
          <p class="card-body__texts">
            <slot name="texts" />
          </p>
        </div>
      </Host>
    );
  }
}
