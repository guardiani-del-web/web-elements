import { ComponentInterface, Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-accordion',
  styleUrl: 'we-accordion.scss',
  shadow: true,
})
export class WeAccordion implements ComponentInterface {
  @Prop() title: string;

  render() {
    return (
      <div class="tab">
        <input type="checkbox" id="chck1" />
        <label class="tab-label" htmlFor="chck1">{this.title}</label>
        <div class="tab-content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
