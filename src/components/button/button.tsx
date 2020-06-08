import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button implements ComponentInterface {
  @Prop() label: string;

  render() {
    return (
      <Host>
        <button>
          {this.label ? this.label : <slot></slot>}
        </button>
      </Host>
    );
  }

}
