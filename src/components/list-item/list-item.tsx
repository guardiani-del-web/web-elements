import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-list-item',
  styleUrl: 'list-item.scss',
  shadow: true
})
export class ListItem implements ComponentInterface {
  /** If you want to use a simple tooltip you can only add this value */
  @Prop() value: string;

  render() {
    return <Host>{this.value ? this.value : <slot></slot>}</Host>;
  }
}
