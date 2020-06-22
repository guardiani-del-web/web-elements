import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-textarea',
  styleUrl: 'textarea.scss',
  shadow: true
})
export class Textarea implements ComponentInterface {
  /** Test inside the textarea when rendered the first time */
  @Prop() text: string;
  /** Name prop of the textarea */
  @Prop() name: string;
  /** Placeholder appear when there isn't text in the textarea */
  @Prop() placeholder: string;
  /** Identify the readonly property of textarea */
  @Prop() readonly: boolean;
  /** Identify the disabled property of textarea */
  @Prop() disabled: boolean;
  /** Identify the required property of textarea */
  @Prop() required: boolean;
  /** Identify the autofocus property of textarea */
  @Prop() autofocus: boolean;
  /** Identify the maxlength property of textarea */
  @Prop() maxlength = 100000;
  /** Identify the cols property of textarea */
  @Prop() cols;
  /** Identify the rows property of textarea */
  @Prop() rows;

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
          rows={this.rows}
          name={this.name}
        >
          {this.text}
        </textarea>
      </Host>
    );
  }
}
