import { Component, ComponentInterface, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'we-radio',
  styleUrl: 'we-radio.scss',
  shadow: true,
})
export class WeRadio implements ComponentInterface {
  @Prop() value!: string;
  @Prop() disabled: boolean;
  @Prop() checked: boolean;
  @Event() onRadioChange: EventEmitter;

  handleChange(event: any) {
    this.onRadioChange.emit(event);
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
