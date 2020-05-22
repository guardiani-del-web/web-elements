import { ComponentInterface, Component, h, Host, Event, EventEmitter, State, Prop } from '@stencil/core';
import { generateUniqueId } from '@utils';

@Component({
  tag: 'we-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion implements ComponentInterface {
  @Prop() open: boolean;
  @State() valueId = generateUniqueId();
  @Event() accordionCallback: EventEmitter;

  handleChange(event: any) {
    this.accordionCallback.emit({ value: event.path[0].value });
  }

  render() {
    return (
      <Host data-id={this.valueId}>
        <input type="radio" name="accordion" id="acc-open" checked={this.open} value={this.valueId} onChange={this.handleChange.bind(this)} />
        <section class="accordion">
          <label class="accordion-title" htmlFor="acc-open">
            <slot name="title" />
          </label>
          <label class="accordion-close" htmlFor="acc-close"></label>
          <div class="accordion-content">
            <slot name="content" />
          </div>
        </section>
        <input type="radio" name="accordion" id="acc-close" />
      </Host>
    );
  }
}
