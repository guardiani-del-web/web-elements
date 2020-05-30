import { Component, Host, h, Prop } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-slider',
  styleUrl: 'slider.scss',
  shadow: true,
})
export class Slider {
  @Prop() value!: number;
  @Prop() min: number;
  @Prop() max: number;
  @Prop() disabled: boolean = false;
  @Prop() sliderCallback: any;

  handleChange(event: CustomEvent) {
    const value = event.currentTarget['value'];
    this.sliderCallback = parseFunction(this.sliderCallback);
    this.sliderCallback({ name: 'slider', value });
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
