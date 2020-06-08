import { ComponentInterface, Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'we-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button implements ComponentInterface {
  @Prop() label: string;
  @Prop() value!: string;
  @Event() accordionCallback: EventEmitter;

  handleButtonPressed() {
    this.accordionCallback.emit(this.value);
  }

  render() {
    return (
      <Host>
        <button onClick={()=>this.handleButtonPressed()}>
          {this.label ? this.label : <slot></slot>}
        </button>
      </Host>
    );
  }

}
