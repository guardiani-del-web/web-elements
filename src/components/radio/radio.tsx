import { Component, ComponentInterface, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'we-radio',
  styleUrl: 'radio.scss',
  shadow: true
})
export class Radio implements ComponentInterface {
  /** Value returned when the input is submitted if this radio button is checked */
  @Prop() value!: string;
  /** Identify if this radio button is disabled or not */
  @Prop() disabled: boolean;
  /** identify if this radio button is checked or not when the page is loaded*/
  @Prop() checked: boolean;
  /** Event triggered when this radio button is checked/not checked returning the value prop for payload */
  @Event() radioCallback: EventEmitter;

  handleChange() {
    this.radioCallback.emit(this.value);
  }

  render() {
    return (
      <Host>
        <input
          type="radio"
          id="weradio"
          value={this.value}
          disabled={this.disabled}
          checked={this.checked}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor="weradio">
          <slot></slot>
        </label>
      </Host>
    );
  }
}
