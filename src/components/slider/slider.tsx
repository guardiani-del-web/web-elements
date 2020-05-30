import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

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
  @Event() sliderChange: EventEmitter;

  handleChange(event: { target: HTMLInputElement }) {
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
