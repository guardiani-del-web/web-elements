import { Component, ComponentInterface, Host, h, Prop, Listen, Element, State } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-checkbox-group',
  shadow: true,
})
export class CheckboxGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop() name!: any;
  @Prop() changeCallback: any;
  @State() checkedItems: Array<any>;

  constructor() {
    this.checkedItems = [];
  }

  @Listen('checkboxCallback')
  checkboxCallbackHandler(event: CustomEvent) {
    const value = event.detail;
    this.changeCallback = parseFunction(this.changeCallback);

    const getCheckedIndex = this.checkedItems.findIndex(item => item.value === value);

    if (getCheckedIndex === -1) {
      this.checkedItems.push({ name: this.name, value});
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
