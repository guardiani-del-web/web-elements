import { Component, ComponentInterface, Host, h, Prop, Listen, Element, State } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-checkbox-group',
  shadow: true,
})
export class WeCheckboxGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop() name!: any;
  @Prop() onChangeCallback: any;
  @State() checkedItems: Array<any>;

  constructor() {
    this.checkedItems = [];
  }

  @Listen('onCheckboxChange')
  onRadioChangeHandler(event: any) {
    const { value } = event.target;
    this.onChangeCallback = parseFunction(this.onChangeCallback);

    const getCheckedIndex = this.checkedItems.findIndex(item => item.value === value);

    if (getCheckedIndex === -1) {
      this.checkedItems.push({ name: this.name, value});
    } else {
      this.checkedItems.splice(getCheckedIndex, 1);
    }
  
    this.onChangeCallback(this.checkedItems);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
