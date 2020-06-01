import { Component, ComponentInterface, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
    tag: 'we-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: true
})
export class Checkbox implements ComponentInterface {
    @Prop() value!: string;
    @Prop() disabled: boolean;
    @Prop() checked: boolean;
    @Event() checkboxCallback: EventEmitter;

    handleChange(event: { target: HTMLInputElement }) {
        this.checkboxCallback.emit(event.target.value);
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
