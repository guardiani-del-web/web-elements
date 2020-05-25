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
  @Prop() label: string = "";
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
        <h1>we-switch is ready!</h1>
      </Host>
    );
  }

}
