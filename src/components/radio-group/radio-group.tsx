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

export interface RadioValue {
  value: string;
  children: Array<any>;
}

@Component({
  tag: 'we-radio-group',
  shadow: true
})
export class RadioGroup implements ComponentInterface {
  @Element() el: HTMLWeRadioGroupElement;
  /** Value that identify this radio group */
  @Prop() value!: string;
  /** Event triggered when a radio button inside change its state that returning the name of radio group and the value of radio button checked */
  @Event() radioGroupCallback: EventEmitter<RadioValue>;
  @State() children = [];

  @Listen('radioCallback')
  radioCallbackHandler(prop) {
    const { value, checked } = prop.detail;
    this.children.forEach((child) => {
      if (child['value'] == value) {
        child['checked'] = checked;
      }
    });
    this.radioGroupCallback.emit({ value: this.value, children: this.children });
  }

  componentDidLoad() {
    const radios = this.el.querySelectorAll(':scope > we-radio');
    radios.forEach((radio) => {
      const child = {};
      const value = radio.getAttribute('value');
      child['value'] = value;
      const checked = radio.getAttribute('checked');
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
