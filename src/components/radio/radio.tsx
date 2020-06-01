import { Component, ComponentInterface, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
      tag: 'we-radio',
      styleUrl: 'radio.scss',
      shadow: true
})
export class Radio implements ComponentInterface {
      @Prop() value!: string;
      @Prop() disabled: boolean;
      @Prop() checked: boolean;
      @Event() radioCallback: EventEmitter;

      handleChange(event: { target: HTMLInputElement }) {
            this.radioCallback.emit(event.target.value);
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
