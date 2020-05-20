import { ComponentInterface, Component, h, Host } from '@stencil/core';

@Component({
  tag: 'we-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion implements ComponentInterface {
  render() {
    return (
      <Host>
        <input type="radio" name="accordion" id="acc-open" />
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
