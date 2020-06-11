import { Component, Host, h, Prop } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-slider',
  styleUrl: 'slider.scss',
  shadow: true
})
export class WeSlider {
  /** Name of slider, put in the payload of changeCallback event */
  @Prop() name!: string;
  /** Starting value of slider */
  @Prop() value: number;
  /** Minimum value you can set in the slider */
  @Prop() min: number;
  /** Maximum value you can set in the slider */
  @Prop() max: number;
  /** Identify if slider is disabled or not */
  @Prop() disabled = false;
  /** Event triggered any time user moves the slider putting in the payload name and current value */
  @Prop() changeCallback: any;

  handleChange(event: { target: HTMLInputElement }) {
    if (this.changeCallback) {
      this.changeCallback = parseFunction(this.changeCallback);
      this.changeCallback({ name: this.name, value: event.target.value });
    }
  }

  render() {
    return (
      <Host>
        <label htmlFor="weslider">
          <slot />
        </label>
        <input
          type="range"
          id="weslider"
          name={this.name}
          min={this.min}
          max={this.max}
          value={this.value}
          disabled={this.disabled}
          onChange={this.handleChange.bind(this)}
        />
      </Host>
    );
  }
}
