import { ComponentInterface, Component, Host, h, Listen, Element, State } from '@stencil/core';

@Component({
    tag: 'we-tab-group',
    styleUrl: 'tab-group.scss',
    shadow: true
})
export class TabGroup implements ComponentInterface {
    @Element() el: HTMLWeTabGroupElement;
    @State() contentSlot: HTMLDivElement;
    @State() tabs: NodeListOf<HTMLWeTabElement>;

    @Listen('tabCallback')
    tabCallbackHandler(event: CustomEvent) {
        const value = event.detail;
        const line: HTMLElement = this.el.shadowRoot.querySelector('.line');

        this.tabs.forEach((tab, tabPosition) => {
            tab.style.width = `${100 / this.tabs.length}%`;
            if (tab.getAttribute('data-id') === value) {
                const left = tabPosition * (100 / this.tabs.length);
                const currentContent = tab.querySelector('[slot="content"]');
                this.contentSlot.innerHTML = currentContent.innerHTML;
                this.el.appendChild(this.contentSlot);
                tab.setAttribute('enabled', 'true');
                line.style.left = `${left}%`;
            } else {
                tab.setAttribute('enabled', 'false');
            }
        });
    }

    initTabs() {
        const line: HTMLElement = this.el.shadowRoot.querySelector('.line');
        let getTabEnabledPosition = 0;
        this.tabs.forEach((tab, position) => {
            if (tab.getAttribute('enabled') === 'true') {
                getTabEnabledPosition = position;
            }
            tab.style.width = `${100 / this.tabs.length}%`;
        });
        const defaultContent = this.tabs[getTabEnabledPosition].querySelector('[slot="content"]');
        const left = getTabEnabledPosition * (100 / this.tabs.length);
        line.style.left = `${left}%`;
        this.contentSlot.innerHTML = defaultContent.innerHTML;
        line.style.width = `${100 / this.tabs.length}%`;
        this.el.appendChild(this.contentSlot);
    }

    constructor() {
        this.contentSlot = document.createElement('div');
        this.contentSlot.slot = 'tab-content';
        this.tabs = this.el.querySelectorAll('we-tab');
    }

    componentDidRender() {
        this.initTabs();
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
