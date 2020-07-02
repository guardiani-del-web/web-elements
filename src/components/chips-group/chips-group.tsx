import {
  ComponentInterface,
  Component,
  Host,
  h,
  State,
  Listen,
  Prop,
  Event,
  Element,
  EventEmitter
} from '@stencil/core';

export interface ChipsGroupValue {
  value: string;
  children: Array<any>;
}

@Component({
  tag: 'we-chips-group',
  styleUrl: 'chips-group.scss',
  shadow: true
})
export class ChipsGroup implements ComponentInterface {
  @Element() el: HTMLWeChipsGroupElement;
  /** Value that identify this chips group */
  @Prop() value!: string;
  /* Event triggered when a chipd is added in the gruop, a chips is selected or removed passing the value of the group and an array with children state*/
  @Event() chipsGroupCallback: EventEmitter<ChipsGroupValue>;
  @State() children = [];

  @Listen('removeChipsCallback')
  removeCallbackHandler(prop) {
    const value = prop.detail;
    const getRemovedIndex = this.children.findIndex((item) => item.value === value);
    if (getRemovedIndex >= 0) {
      this.children.splice(getRemovedIndex, 1);
    }
    this.chipsGroupCallback.emit({ value: this.value, children: this.children });
  }

  @Listen('selectChipsCallback')
  selectCallbackHandler(prop) {
    console.log('listen selectChipsCallback', prop);
    const { value, isSelected } = prop.detail;
    this.children.forEach((child) => {
      if (child['value'] === value) child['isSelected'] = isSelected;
    });
    this.chipsGroupCallback.emit({ value: this.value, children: this.children });
  }

  componentDidLoad() {
    const items = this.el.querySelectorAll(':scope > we-chips');
    items.forEach((i) => {
      const child = {};
      const value = i.getAttribute('value');
      child['value'] = value;
      child['isSelected'] = false;
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
