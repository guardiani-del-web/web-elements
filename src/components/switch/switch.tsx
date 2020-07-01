import { ComponentInterface, Component, Host, h, Prop, Event, State } from '@stencil/core';

@Component({
  tag: 'we-switch',
  styleUrl: 'switch.scss',
  shadow: true
})
export class Switch implements ComponentInterface {
  /** Value of switch, put in the payload of changeCallback event */
  @Prop() value!: string;
  /** Text put in the left of switch */
  @Prop() labelLeft: string;
  /** Text put in the right of switch */
  @Prop() labelRight: string;
  /** Default value of switch when component is rendered the first time */
  @Prop() checked = false;
  @State() checkedState = this.checked;
  /** Event triggered any time user change the state of the switch putting in the payload value and status */
  @Event() switchCallback: any;

  handleChangeState() {
    this.checkedState = !this.checkedState;
    this.switchCallback.emit({ value: this.value, checked: this.checkedState });
  }

  render() {
    return (
      <Host>
        <input
          type="checkbox"
          id="switch"
          name={this.value}
          onChange={this.handleChangeState.bind(this)}
          checked={this.checked}
        />
        <label class="switch" htmlFor="switch"></label>
        {this.labelLeft && <label class="left">Off</label>}
        {this.labelRight && <label class="right">On</label>}
      </Host>
    );
  }
}
