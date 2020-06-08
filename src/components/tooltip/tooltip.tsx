import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class Tooltip implements ComponentInterface {
  /** value: [optional] if you want to use a simple tooltip you can only add this value */
  @Prop() value: string;

  render() {
    return (
      <Host>
        <slot name="reference"></slot>
        <div class="tooltip">{this.value ? this.value : <slot name="tooltip"></slot>}</div>
      </Host>
    );
  }
}
