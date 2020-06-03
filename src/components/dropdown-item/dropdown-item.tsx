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
  @Prop() arrowType: string = "left";
  @Prop() arrowTypeChecked: string = "left";
  @State() arrowState: string = this.arrowType;
  @Event() clickCallback: EventEmitter;
  @State() childrenOpen: boolean = false;

  @Prop() heightChildren: string = "0";
  @Prop() widthChildren: string = "0";
  @Prop() heightChildrenOpen: string = "100%";
  @Prop() widthChildrenOpen: string = "100%";
  @Prop() topChildren: string = "auto";
  @Prop() bottomChildren: string = "auto";
  @Prop() leftChildren: string = "auto";
  @Prop() rightChildren: string = "auto";

  handleChangeState(event: any) {
    this.arrowState =
      this.arrowState == this.arrowType
        ? this.arrowTypeChecked
        : this.arrowType;
    this.childrenOpen = !this.childrenOpen;
    this.clickCallback.emit(event);
    console.log("childerOpen", this.childrenOpen);
  }

  render() {
    return (
      <Host onClick={() => this.handleChangeState(this)}>
        <label>{this.label}</label>
        {this.arrowType && <i class={"arrow " + this.arrowState}></i>}
        <div
          class="children"
          style={
            {
              width:this.childrenOpen ? this.widthChildrenOpen : this.widthChildren,
              height:this.childrenOpen ? this.heightChildrenOpen : this.heightChildren,
              top: this.topChildren,
              bottom: this.bottomChildren,
              left: this.leftChildren,
              right: this.rightChildren
            }
          }
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
