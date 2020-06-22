import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  Listen,
  Element,
  State
} from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-checkbox-group',
  shadow: true
})
export class CheckboxGroup implements ComponentInterface {
  @Element() el: HTMLWeCheckboxGroupElement;
  /** Name that identify this checkbox group */
  @Prop() name!: string;
  /** Event triggered when a checkbox inside change its state that returning the name of checkbox group and the value of checkbox changed */
  @Prop() changeCallback: any;
  @State() checkedItems: Array<any>;

  constructor() {
    this.checkedItems = [];
  }

  @Listen('checkboxCallback')
  checkboxCallbackHandler(event: CustomEvent) {
    const value = event.detail;
    this.changeCallback = parseFunction(this.changeCallback);

    const getCheckedIndex = this.checkedItems.findIndex((item) => item.value === value);

    if (getCheckedIndex === -1) {
      this.checkedItems.push({ name: this.name, value });
    } else {
      this.checkedItems.splice(getCheckedIndex, 1);
    }

    this.changeCallback(this.checkedItems);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
