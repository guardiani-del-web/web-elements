import { ComponentInterface, Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'we-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Button implements ComponentInterface {
  /** If you use label prop you can create simple button with only text, if you want to use button with many things inside don't use label prop but put the contents inside the tag we-button */
  @Prop() label: string;
  /** Value returned from buttonCallback event when button will be pressed*/
  @Prop() value!: string;
  /** Event triggered when button is pressed */
  @Event() buttonCallback: EventEmitter;

  handleButtonPressed() {
    this.buttonCallback.emit(this.value);
  }

  render() {
    return (
      <Host>
        <button onClick={() => this.handleButtonPressed()}>
          {this.label ? this.label : <slot></slot>}
        </button>
      </Host>
    );
  }
}
