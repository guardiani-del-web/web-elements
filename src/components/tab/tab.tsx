import { ComponentInterface, Component, Host, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import { generateUniqueId } from '@utils';

@Component({
  tag: 'we-tab',
  styleUrl: 'tab.scss',
  shadow: true,
})
export class Tab implements ComponentInterface {
  @Prop() enabled: boolean;
  @State() valueId = generateUniqueId();
  @Event() tabCallback: EventEmitter;

  handleChange(event: any) {
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
          onChange={this.handleChange.bind(this)} />
        <label htmlFor="wetab">
          <slot name="header" />
        </label>
        <slot name="content" />
      </Host>
    );
  }

}
