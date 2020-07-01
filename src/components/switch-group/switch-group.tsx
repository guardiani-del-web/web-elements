import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen,
  Event, EventEmitter
} from '@stencil/core';

export interface SwitchValue {
  name: string;
  children: Array<any>;
}

@Component({
  tag: 'we-switch-group',
  styleUrl: 'switch-group.scss',
  shadow: true
})
export class SwitchGroup implements ComponentInterface {
  @Element() el: HTMLWeSwitchGroupElement;
  /** Name that identify this switch group */
  @Prop() value!: string;
  /** Function called when a switch inside change it's state */
  @Event() changeSwitchCallback: EventEmitter<SwitchValue>;
  @State() childrenState: any = {};

  @Listen('changeSwitchCallback')
  changeSwitchCallbackHandler(prop) {
    const { value, checked } = prop.detail;
    if (this.childrenState[value] != checked) {
      this.childrenState[value] = checked;
      this.changeSwitchCallback.emit({ value: this.value, children: this.childrenState });
    }
  }

  componentDidLoad() {
    const items = this.el.querySelectorAll(':scope > we-switch');
    const children = {};
    items.forEach((i) => {
      const value = i.getAttribute('value');
      const checked = i.getAttribute('checked');
      children[value] = checked === 'false' ? false : true;
    });
    this.childrenState = children;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
