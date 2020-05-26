import { ComponentInterface, Component, Host, h, Listen, Element, State } from '@stencil/core';

@Component({
  tag: 'we-tab-group',
  styleUrl: 'tab-group.scss',
  shadow: true,
})
export class TabGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  @State() contentSlot: HTMLDivElement;
  
  @Listen('tabCallback')
  tabCallbackHandler(event?: any) {
    const value = event && event.detail || null;
    const line: any = this.el.shadowRoot.querySelector('.line');
    const tabs = this.el.querySelectorAll('we-tab');
    let isEnabled = false;

    tabs.forEach((tab, tabPosition) => {
      if (tab.getAttribute('data-id') === value 
        || (value === null && tab.getAttribute('enabled'))) {
        const left = (tabPosition) * (100 / tabs.length);
        const currentContent = tab.querySelector('[slot="content"]');
        isEnabled = true;
        this.contentSlot.innerHTML = currentContent.innerHTML;
        this.el.appendChild(this.contentSlot);
        tab.setAttribute('enabled', 'true');
        line.style.left = `${left}%`;
      } else {
        tab.setAttribute('enabled', 'false');
      }
    });
    if (!isEnabled) {
      const defaultContent = tabs[0].querySelector('[slot="content"]');
      this.contentSlot.innerHTML = defaultContent.innerHTML;
      line.style.width = `${100 / tabs.length}%`;
      this.el.appendChild(this.contentSlot);
    } 
  }

  constructor() {
    this.contentSlot = document.createElement('div');
    this.contentSlot.slot = 'tab-content';
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
        <slot name="tab-content" />
      </Host>
    );
  }
}
