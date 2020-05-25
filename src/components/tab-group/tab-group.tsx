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
    const content = this.el.shadowRoot.querySelector('.content');
    const line = this.el.shadowRoot.querySelector('.line');
    const tabs = this.el.querySelectorAll('we-tab');

    tabs.forEach((tab, tabPosition) => {
      if (tab.getAttribute('data-id') === value) {
        const left = (tabPosition) * (100 / tabs.length);
        const currentContent = tab.querySelector('div').innerHTML;
        content.innerHTML = currentContent;
        tab.setAttribute('enabled', 'true');
        line.setAttribute('style', `left: ${left}%`);
      } else {
        tab.setAttribute('enabled', 'false');
      }
    });
  }

  render() {
    return (
      <Host>
        <div class="content"></div>
        <slot></slot>
        <div class="line"></div>
      </Host>
    );
  }
}
