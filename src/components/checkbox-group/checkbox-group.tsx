import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  Listen,
  Element,
  State,
  Event,
  EventEmitter
} from '@stencil/core';

export interface CheckboxValue {
  value: string;
  children: Array<any>;
}

@Component({
  tag: 'we-checkbox-group',
  shadow: true
})
export class CheckboxGroup implements ComponentInterface {
  @Element() el: HTMLWeCheckboxGroupElement;
  /** Value that identify this checkbox group */
  @Prop() value!: string;
  /** Event triggered when a checkbox inside change its state that returning the value of checkbox group and the value of checkbox changed */
  @Event() checkboxGroupCallback: EventEmitter<CheckboxValue>;
  @State() children = [];

  @Listen('checkboxCallback')
  checkboxCallbackHandler(prop) {
    const { value, checked } = prop.detail;
    this.children.forEach((child) => {
      if (child['value'] == value) {
        child['checked'] = checked;
      }
    });
    console.log('children', this.children);
    this.checkboxGroupCallback.emit({ value: this.value, children: this.children });
  }

  componentDidLoad() {
    const items = this.el.querySelectorAll(':scope > we-checkbox');
    items.forEach((i) => {
      const child = {};
      const value = i.getAttribute('value');
      child['value'] = value;
      const checked = i.getAttribute('checked');
      child['checked'] = checked === 'true' ? true : false;
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
