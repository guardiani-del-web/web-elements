import { ComponentInterface, Component, h } from '@stencil/core';

@Component({
  tag: 'we-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion implements ComponentInterface {
  render() {
    return (
      <div class="accordion arrows">
        <input type="radio" name="accordion" id="cb1" />
        <section class="box">
          <label class="box-title" htmlFor="cb1">
            <slot name="title" />
          </label>
          <label class="box-close" htmlFor="acc-close"></label>
          <div class="box-content">
            <slot name="content" />
          </div>
        </section>
        <input type="radio" name="accordion" id="acc-close" />
      </div>
    );
  }
}
