import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-navigation-drawer',
  styleUrl: 'navigation-drawer.scss',
  shadow: true
})
export class NavigationDrawer implements ComponentInterface {
  /** If true the navigation drawer is closed */
  @Prop() closed = true;

  render() {
    return (
      <Host class={this.closed && 'closed'}>
        <slot></slot>
      </Host>
    );
  }
}
