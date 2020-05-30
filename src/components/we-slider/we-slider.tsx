import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-slider',
  styleUrl: 'we-slider.scss',
  shadow: true,
})
export class WeSlider {
  @Prop() value: number;
  @Prop() min: number;
  @Prop() max: number;
  @Prop() disabled: boolean = false;
  @Prop() onChange: any;
  @Event() sliderChange: EventEmitter;

  connectedCallback() {
    if (this.onChange) {
      this.onChange = parseFunction(this.onChange);
    }
  }

  handleChange(event: any) {
    this.sliderChange.emit(event.target.value);
  }

  render() {
    return (
      <Host>
        <label htmlFor="weslider">
          <slot></slot>
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
