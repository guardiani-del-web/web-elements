import { ComponentInterface, Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'we-textarea',
  styleUrl: 'textarea.scss',
  shadow: true,
})
export class Textarea implements ComponentInterface {
  @State() text: string;

  handleChange(event: any) {
    this.text = event.target.value;

    if (event.target.validity.typeMismatch) {
      console.log('this element is not valid')
    }
  }

  render() {
    return (
      <Host>
        <textarea onChange={this.handleChange.bind(this)}>
          {this.text}
        </textarea>
      </Host>
    );
  }

}
