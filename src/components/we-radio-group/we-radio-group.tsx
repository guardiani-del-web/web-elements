import { Component, ComponentInterface, Host, h, Prop, Listen, Element } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-radio-group',
  shadow: true,
})
export class WeRadioGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop() onChange: any;

  @Listen('onRadioChange')
  onRadioChangeHandler(event: any) {
    const { name, value } = event.target;
    const radios = this.el.querySelectorAll('we-radio');
    this.onChange = parseFunction(this.onChange);

    radios.forEach(radio => {
      if (radio.getAttribute('value') === value) {
        radio.setAttribute('checked', 'true');
      } else {
        radio.setAttribute('checked', 'false');
      }
    });
    this.onChange({ name, value });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
