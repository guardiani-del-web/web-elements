import { Component, Host, h, Prop } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-slider',
  styleUrl: 'slider.scss',
  shadow: true,
})
export class WeSlider {
  @Prop() name!: string;
  @Prop() value: number;
  @Prop() min: number;
  @Prop() max: number;
  @Prop() disabled: boolean = false;
  @Prop() changeCallback: any;

  handleChange(event: { target: HTMLInputElement }) {
    if (this.changeCallback) {
      this.changeCallback = parseFunction(this.changeCallback);
      this.changeCallback({ name: this.name, value: event.target.value});
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
