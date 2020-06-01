import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';
import { parseFunction } from '@utils';

@Component({
  tag: 'we-switch',
  styleUrl: 'switch.scss',
  shadow: true
})
export class Switch implements ComponentInterface {
  @Prop() name!: any;
  @Prop() labelLeft = '';
  @Prop() labelRight = '';
  @Prop() enabled = false;
  @Prop() changeCallback: any;

  handleChangeState(event: CustomEvent) {
    const status = event.currentTarget['checked'];
    this.changeCallback = parseFunction(this.changeCallback);
    this.changeCallback({ name: this.name, status });
  }

  render() {
    return (
      <Host>
        <input
          type="checkbox"
          id="switch"
          name={this.name}
          onChange={this.handleChangeState.bind(this)}
          checked={this.enabled}
        />
        <label class="switch" htmlFor="switch"></label>
        {this.labelLeft && <label class="left">Off</label>}
        {this.labelRight && <label class="right">On</label>}
      </Host>
    );
  }
}
