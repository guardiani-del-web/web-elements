import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter
} from "@stencil/core";


@Component({
  tag: 'we-switch',
  styleUrl: 'switch.scss',
  shadow: true,
})
export class Switch implements ComponentInterface {
  @Prop() labelLeft: string= "";
  @Prop() labelRight: string= "";
  @Prop() initialState: boolean = true;
  @State() state: boolean = this.initialState;
  @Event() changeStateCallback: EventEmitter;


  handleChangeState() {
    this.state = !this.state;
    this.changeStateCallback.emit(this.state);
  }

  render() {
    return (
      <Host>
        <div class="container">
          <input type="checkbox" id="switch" />
          <label class="switch" for="switch"></label>
          {this.labelLeft && <label class="left">Off</label>}
          {this.labelRight && <label class="right">On</label>}
        </div>
      </Host>
    );
  }

}
