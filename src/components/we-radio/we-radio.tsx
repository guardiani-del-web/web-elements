import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-radio',
  styleUrl: 'we-radio.scss',
  shadow: true,
})
export class WeRadio implements ComponentInterface {
  @Prop() value!: string;
  @Prop() disabled: boolean;
  @Prop() checked: boolean;

  render() {
    return (
      <Host>
        <input
          type="radio" 
          id="weradio"
          value={this.value} 
          disabled={this.disabled} 
          checked={this.checked}
        />
        <label htmlFor="weradio" class="radio-label">
          <slot></slot>
        </label>
      </Host>
    );
  }
}
