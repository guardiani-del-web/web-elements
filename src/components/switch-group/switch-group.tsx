import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen,
  Event,
  EventEmitter
} from '@stencil/core';

export interface SwitchGroupValue {
  value: string;
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
  @Event() switchGroupCallback: EventEmitter<SwitchGroupValue>;
  @State() children = [];

  @Listen('switchCallback')
  changeSwitchCallbackHandler(prop) {
    const { value, checked } = prop.detail;
    this.children.forEach((child) => {
      if (child['value'] == value) {
        child['checked'] = checked;
      }
    });
    this.switchGroupCallback.emit({ value: this.value, children: this.children });
  }

  componentDidLoad() {
    const items = this.el.querySelectorAll(':scope > we-switch');
    items.forEach((i) => {
      const child = {};
      const value = i.getAttribute('value');
      child['value'] = value;
      const checked = i.getAttribute('checked');
      child['checked'] = checked === 'false' ? false : true;
      this.children.push(child);
    });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
