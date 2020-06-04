import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Listen
} from "@stencil/core";

@Component({
  tag: "we-dropdown-item",
  styleUrl: "dropdown-item.scss",
  shadow: true,
})
export class DropdownItem implements ComponentInterface {
  @Prop() label: string = "";
  @Prop() arrowType: string = "";
  @Prop() arrowTypeChecked: string = "";
  @State() arrowState: string = this.arrowType;
  @Event() clickCallback: EventEmitter;
  @State() childrenOpen: boolean = false;
  @State() overflow: string = "hidden";

  @Prop() heightChildren: string = "auto";
  @Prop() widthChildren: string = "auto";
  @Prop() heightChildrenOpen: string = "auto";
  @Prop() widthChildrenOpen: string = "auto";
  @Prop() topChildren: string = "auto";
  @Prop() bottomChildren: string = "auto";
  @Prop() leftChildren: string = "auto";
  @Prop() rightChildren: string = "auto";

  handleChangeState(event: any) {
    console.log("change state", event.label);
    this.arrowState =
      this.arrowState == this.arrowType
        ? this.arrowTypeChecked
        : this.arrowType;
    this.childrenOpen = !this.childrenOpen;

    console.log("overflow", this.overflow);
    if (this.overflow === "hidden") {
      setTimeout(() => {
        if (this.childrenOpen === true) this.overflow = "unset";
      }, 500);
    } else this.overflow = "hidden";
  }

  @Listen('mouseOver')
  handleMouseOver(event: any) {
    console.log('Received the custom todoCompleted event: ', event);
  }

  render() {
    return (
      <Host>
        <div class="dropdown-item" onClick={() => this.handleChangeState(this)}>
          <label>{this.label}</label>
          {this.arrowType && <i class={"arrow " + this.arrowState}></i>}
        </div>
        <div
          class="children"
          style={{
            width: this.childrenOpen
              ? this.widthChildrenOpen
              : this.widthChildren,
            height: this.childrenOpen
              ? this.heightChildrenOpen
              : this.heightChildren,
            overflow: this.overflow,
            top: this.topChildren,
            bottom: this.bottomChildren,
            left: this.leftChildren,
            right: this.rightChildren,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
