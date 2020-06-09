import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-textarea',
  styleUrl: 'textarea.scss',
  shadow: true
})
export class Textarea implements ComponentInterface {
  /** Test inside the textarea when rendered the first time */
  @Prop() text:string;
  /** Name prop of the textarea */
  @Prop() name:string;
  /** Placeholder appear when there isn't text in the textarea */
  @Prop() placeholder:string;
  @Prop() readonly:boolean;
  @Prop() disabled:boolean;
  @Prop() required:boolean;
  @Prop() autofocus:boolean;
  @Prop() maxlength = 100000;
  @Prop() cols;
  @Prop() row;

  render() {
    return (
      <Host>
        <textarea
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          readOnly={this.readonly}
          autofocus={this.autofocus}
          maxLength={this.maxlength}
          cols={this.cols}
          rows={this.row}
          name={this.name}
        >
          {this.text}
        </textarea>
      </Host>
    );
  }
}
