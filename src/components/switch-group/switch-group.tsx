import { ComponentInterface, Component, Host, h, Prop, State, Element, Listen } from '@stencil/core';

@Component({
  tag: 'we-switch-group',
  styleUrl: 'switch-group.scss',
  shadow: true
})
export class SwitchGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  /** Name that identify this switch group */
  @Prop() name!: any;
  /** Function called when a switch inside change it's state */
  @Prop() changeSwitchCallback: any;
  @State() childrenState: any = {};

  findAllChildren() {
    const items = this.el.querySelectorAll(':scope > we-switch');
    let childChange = false;
    const children = {};
    items.forEach(i => {
      const name = i.getAttribute('name');
      const checked = i.getAttribute('checked');
      children[name] = checked;
      if ((!this.childrenState.children) || children[name] != this.childrenState.children[name])
        childChange = true;

    });
    if (childChange) {
      this.childrenState = { name: this.name, children };
      this.changeSwitchCallback(this.childrenState);
    }
  }

  @Listen('changeSwitchCallback')
  changeSwitchCallbackHandler() {
    this.findAllChildren();
  }

  componentDidLoad() {
    this.findAllChildren();
  }

  componentDidUpdate() {
    this.findAllChildren();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
