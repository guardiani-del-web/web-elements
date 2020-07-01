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
  checkedItems: Array<any>;
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
  @State() checkedItems: Array<any>;

  constructor() {
    this.checkedItems = [];
  }

  @Listen('checkboxCallback')
  checkboxCallbackHandler(event: CustomEvent) {
    const value = event.detail;

    const getCheckedIndex = this.checkedItems.findIndex((item) => item.value === value);

    if (getCheckedIndex === -1) {
      this.checkedItems.push(value);
    } else {
      this.checkedItems.splice(getCheckedIndex, 1);
    }

    this.checkboxGroupCallback.emit({ value: this.value, checkedItems: this.checkedItems });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
