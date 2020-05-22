import { ComponentInterface, Component, Host, h } from '@stencil/core';

@Component({
  tag: 'we-textarea',
  styleUrl: 'textarea.scss',
  shadow: true,
})
export class Textarea implements ComponentInterface {

  render() {
    return (
      <Host>
        <textarea >

        </textarea>
      </Host>
    );
  }

}
