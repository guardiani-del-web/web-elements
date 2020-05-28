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
        <div class="card">
          <div class="card__body">
            <h5 class="title-body">
              <slot name="title" />
            </h5>
            <h6 class="subtitle-body">
              <slot name="subtitle" />
            </h6>
            <p class="texto-body">
              <slot name="texto" />
            </p>
          </div>
        </div>
      </Host>
    );
  }

}
