import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen
} from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-switch-group',
  styleUrl: 'switch-group.scss',
  shadow: true
})
export class SwitchGroup implements ComponentInterface {
  @Element() el: HTMLWeSwitchGroupElement;
  /** Name that identify this switch group */
  @Prop() name!: any;
  /** Function called when a switch inside change it's state */
  @Prop() changeSwitchCallback: any;
  @State() childrenState: any = {};

  findAllChildren() {
    const items = this.el.querySelectorAll(':scope > we-switch');
    const children = {};
    items.forEach((i) => {
      const name = i.getAttribute('name');
      const checked = i.getAttribute('checked');
      children[name] = checked === 'false' ? false : true;
    });
    this.childrenState = { name: this.name, children };
    this.changeSwitchCallback = parseFunction(this.changeSwitchCallback);
    this.changeSwitchCallback(this.childrenState);
  }

  @Listen('changeSwitchCallback')
  changeSwitchCallbackHandler(prop) {
    const { name, checked } = prop.detail;
    if (this.childrenState.children[name] != checked) {
      this.childrenState.children[name] = checked;
      this.changeSwitchCallback = parseFunction(this.changeSwitchCallback);
      this.changeSwitchCallback(this.childrenState);
    }
  }

  componentDidLoad() {
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
