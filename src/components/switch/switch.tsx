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
  @Prop() initialState: boolean = false;
  @State() state: boolean = this.initialState;
  @Event() switchCallback: EventEmitter;


  handleChangeState(event:any) {
    this.state = !this.state;
    this.switchCallback.emit(event);
  }

  render() {
    return (
      <Host>
        <div class="container">
          <input type="checkbox" id="switch" onClick={this.handleChangeState.bind(this)} checked={this.initialState}/>
          <label class="switch" htmlFor="switch"></label>
          {this.labelLeft && <label class="left">Off</label>}
          {this.labelRight && <label class="right">On</label>}
        </div>
      </Host>
    );
  }

}
