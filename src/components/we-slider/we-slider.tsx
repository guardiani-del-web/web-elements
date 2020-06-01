import { Component, Host, h, Prop } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
    tag: 'we-slider',
    styleUrl: 'we-slider.scss',
    shadow: true
})
export class WeSlider {
    @Prop() value: number;
    @Prop() min: number;
    @Prop() max: number;
    @Prop() disabled = false;
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
