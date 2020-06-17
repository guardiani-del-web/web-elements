import { ComponentInterface, Component, Host, h, State, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'we-chips-group',
  styleUrl: 'chips-group.scss',
  shadow: true,
})
export class ChipsGroup implements ComponentInterface {
  /** Name that identify this chips group */
  @Prop() name!: any;
  @State() selectedChips: Array<any> = [];
  /** Function called when a chip is selected */
  @Prop() selectCallback: any;
  @State() removedChips: Array<any> = [];
  /** Function called when a chip is removed */
  @Prop() removeCallback: any;

  @Listen('removeChipsCallback')
  removeCallbackHandler(value) {
    this.removedChips.push({ name: this.name, value });
    this.removeCallback(this.removedChips);
  }

  @Listen('addChipsCallback')
  addCallbackHandler(value) {
    const getRemovedIndex = this.removedChips.findIndex((item) => item.value === value);
    if(getRemovedIndex >= 0) {
      this.removedChips.splice(getRemovedIndex, 1);
    }
  }

  @Listen('selectChipsCallback')
  selectCallbackHandler(value, isSelected) {
    if (isSelected)
      this.selectedChips.push({ name: this.name, value })
    else {
      const getSelectedIndex = this.selectedChips.findIndex((item) => item.value === value);
      if (getSelectedIndex >= 0) {
        this.selectedChips.splice(getSelectedIndex, 1);
      }
    }
    this.selectCallback(this.selectedChips)
  }


  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
