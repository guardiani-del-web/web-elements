import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
} from "@stencil/core";

@Component({
  tag: "we-dropdown-item",
  styleUrl: "dropdown-item.scss",
  shadow: true,
})
export class DropdownItem implements ComponentInterface {
  @Prop() label: string = "prova";
  @Prop() arrowType: string = "down";
  @Prop() arrowTypeChecked: string = "up";
  @State() arrowState: string = this.arrowType;
  @Event() clickCallback: EventEmitter;

  handleChangeState(event: any) {
    this.arrowState =
      this.arrowState == this.arrowType
        ? this.arrowTypeChecked
        : this.arrowType;
    this.clickCallback.emit(event);
  }

  render() {
    return (
      <Host onClick={() => this.handleChangeState(this)}>
        <label>{this.label}</label>
        {this.arrowType && <i class={"arrow " + this.arrowState}></i>}
        <div class="children">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
