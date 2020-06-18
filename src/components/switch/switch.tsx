import { ComponentInterface, Component, Host, h, Prop, Event } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-switch',
  styleUrl: 'switch.scss',
  shadow: true
})
export class Switch implements ComponentInterface {
  /** Name of switch, put in the payload of changeCallback event */
  @Prop() name!: any;
  /** Text put in the left of switch */
  @Prop() labelLeft = '';
  /** Text put in the right of switch */
  @Prop() labelRight = '';
  /** Default value of switch when component is rendered the first time */
  @Prop() checked = false;
  /** Event triggered any time user change the state of the switch putting in the payload name and status */
  @Event() changeSwitchCallback: any;

  handleChangeState() {
    this.changeSwitchCallback = parseFunction(this.changeSwitchCallback);
    this.changeSwitchCallback.emit();
  }

  render() {
    return (
      <Host>
        <input
          type="checkbox"
          id="switch"
          name={this.name}
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
