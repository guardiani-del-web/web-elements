import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  EventEmitter,
  Event,
  State
} from '@stencil/core';

@Component({
  tag: 'we-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true
})
export class Checkbox implements ComponentInterface {
  /** Value returned when the input is submitted if this checkbox is checked */
  @Prop() value!: string;
  /** Identify if this checkbox is disabled or not */
  @Prop() disabled: boolean;
  /** identify if this checkbox is checked or not when the page is loaded*/
  @Prop() checked: boolean;
  @State() checkedState = this.checked;
  /** Event triggered when this checkbox is checked/not checked returning the value prop for payload */
  @Event() checkboxCallback: EventEmitter;

  handleChange() {
    this.checkedState = !this.checkedState;
    this.checkboxCallback.emit({ value: this.value, checked: this.checkedState });
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
