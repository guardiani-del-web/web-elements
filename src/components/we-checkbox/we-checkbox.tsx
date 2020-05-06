import { Component, ComponentInterface, Host, h, Prop } from '@stencil/core';
import { parseFunction } from '../../utils/utils';

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

  connectedCallback() {
    if (this.onChange) {
      this.onChange = parseFunction(this.onChange);
    }
  }

  handleChange(event: UIEvent) {
    if (this.onChange) {
      this.onChange(event);
    }
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
