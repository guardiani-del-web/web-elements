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
  @State() children: Array<any>;

  @Listen('radioCallback')
  radioCallbackHandler(event: CustomEvent) {
    const details = event.detail;
    const radios = this.el.querySelectorAll('we-radio');

    radios.forEach((radio) => {
      if (radio.getAttribute('value') === details) {
        radio.setAttribute('checked', 'true');
      } else {
        radio.setAttribute('checked', 'false');
      }
    });
    this.radioGroupCallback.emit({ value: this.value, children: this.children });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
