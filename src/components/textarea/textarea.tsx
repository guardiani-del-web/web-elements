import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-textarea',
  styleUrl: 'textarea.scss',
  shadow: true,
})
export class Textarea implements ComponentInterface {
  @Prop() text: string = "";
  @Prop() name: string = "";
  @Prop() placeholder: string = "";
  @Prop() readonly: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() autofocus: boolean = false;
  @Prop() maxlength = 100000;
  @Prop() cols;
  @Prop() row;

  render() {
    return (
      <Host>
        <textarea placeholder={this.placeholder} disabled={this.disabled} required={this.required} readOnly={this.readonly} autofocus={this.autofocus} maxLength={this.maxlength} cols={this.cols} rows={this.row} name={this.name}>
          {this.text}
        </textarea>
      </Host>
    );
  }

}
