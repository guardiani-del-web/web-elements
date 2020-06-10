import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-navigation-drawer',
  styleUrl: 'navigation-drawer.scss',
  shadow: true,
})
export class NavigationDrawer implements ComponentInterface {

  render() {
    return (
      <Host>
        <h1>we-navigation-drawer is ready!</h1>
      </Host>
    );
  }

}
