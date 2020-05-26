import { ComponentInterface, Component, Host, h, Listen, Element } from '@stencil/core';

@Component({
  tag: 'we-tab-group',
  styleUrl: 'tab-group.scss',
  shadow: true,
})
export class TabGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  
  @Listen('tabCallback')
  tabCallbackHandler(event?: any) {
    const value = event && event.detail || null;
    const content = this.el.shadowRoot.querySelector('section');
    const line = this.el.shadowRoot.querySelector('.line');
    const tabs = this.el.querySelectorAll('we-tab');
    let isEnabled = false;

    tabs.forEach((tab, tabPosition) => {
      if (tab.getAttribute('data-id') === value 
        || (value === null && tab.getAttribute('enabled'))) {
        const left = (tabPosition) * (100 / tabs.length);
        const currentContent = tab.querySelector('[slot="content"]');
        isEnabled = true;
        content.innerHTML = currentContent.innerHTML;
        tab.setAttribute('enabled', 'true');
        line.setAttribute('style', `left: ${left}%`);
      } else {
        tab.setAttribute('enabled', 'false');
      }
    });
    if (!isEnabled) {
      const defaultContent = tabs[0].querySelector('[slot="content"]');
      content.innerHTML = defaultContent.innerHTML;
    } 
  }

  componentDidRender() {
    this.tabCallbackHandler();
  }

  render() {
    return (
      <Host>
        <header>
          <slot></slot>
          <div class="line"></div>
        </header>
        <section></section>
      </Host>
    );
  }
}
