import { ComponentInterface, Component, h, Host, Event, EventEmitter, State, Prop } from '@stencil/core';
import { generateUniqueId } from '@utils';

@Component({
  tag: 'we-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion implements ComponentInterface {
  @Prop() open: boolean;
  @State() openId = generateUniqueId();
  @State() closeId = generateUniqueId();
  @Event() accordionCallback: EventEmitter;

  handleChange(event: { target: HTMLInputElement }) {
    this.accordionCallback.emit(event.target.value);
  }

  render() {
    return (
      <Host data-id={this.openId}>
        <input type="radio" name="accordion" id={this.openId} checked={this.open} value={this.openId} onChange={this.handleChange.bind(this)} />
        <section class="accordion">
          <label class="accordion-title" htmlFor={this.openId}>
            <slot name="title" />
          </label>
          <label class="accordion-close" htmlFor={this.closeId}></label>
          <div class="accordion-content">
            <slot name="content" />
          </div>
        </section>
        <input type="radio" name="accordion" id={this.closeId} />
      </Host>
    );
  }
}
