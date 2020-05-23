import { ComponentInterface, Component, Host, h, Listen, Element } from '@stencil/core';

@Component({
  tag: 'we-tab-group',
  styleUrl: 'tab-group.scss',
  shadow: true,
})
export class TabGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  
  @Listen('tabCallback')
  tabCallbackHandler(event: any) {
    const value = event.detail;
    const tabs = this.el.querySelectorAll('we-tab');

    tabs.forEach(tab => {
      if (tab.getAttribute('data-id') === value) {
        tab.setAttribute('enabled', 'true');
      } else {
        tab.setAttribute('enabled', 'false');
      }
    });
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <div class="line"></div>
      </Host>
    );
  }
}
