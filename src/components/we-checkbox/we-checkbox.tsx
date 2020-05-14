import { Component, ComponentInterface, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'we-checkbox',
  styleUrl: 'we-checkbox.scss',
  shadow: true,
})
export class WeCheckbox implements ComponentInterface {
  @Prop() value!: string;
  @Prop() disabled: boolean;
  @Prop() checked: boolean;
  @Prop() onChange: any;
  @Event() onCheckboxChange: EventEmitter;

  handleChange(event: any) {
    this.onCheckboxChange.emit(event);
  }

  render() {
    return (
      <Host>
        <input 
          type="checkbox" 
          id="wecheckbox"
          value={this.value} 
          disabled={this.disabled} 
          checked={this.checked}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor="wecheckbox">
          <slot></slot>
        </label>
      </Host>
    );
  }
}
