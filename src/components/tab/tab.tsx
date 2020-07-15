import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State
} from '@stencil/core';
import { generateUniqueId } from '@utils';

/**
 * @slot header - Slot for the title
 * @slot content - Slot for the content
 */
@Component({
  tag: 'we-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab implements ComponentInterface {
  /** Default value of tab (opened/closed) when component is triggered the first time*/
  @Prop() enabled: boolean;
  @State() valueId = generateUniqueId();
  /** Event triggered when user select a tab putting in the payload the value id generated */
  @Event() tabCallback: EventEmitter;

  handleChange(event: { target: HTMLInputElement }) {
    this.tabCallback.emit(event.target.value);
  }

  render() {
    return (
      <Host data-id={this.valueId}>
        <input
          type="radio"
          id="wetab"
          name="tab"
          checked={this.enabled}
          value={this.valueId}
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor="wetab">
          <slot name="header" />
        </label>
        <slot name="content" />
      </Host>
    );
  }
}
