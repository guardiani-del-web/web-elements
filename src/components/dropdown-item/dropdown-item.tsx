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
  @State() childrenOpen: boolean = false;

  @Prop() heightChildren: string = "200px";
  @Prop() widthChildren: string = "100px";
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

  componentDidLoad() {
    let root = document.documentElement;
    console.log("componentDidLoad()", root, root.querySelector("#children"));
    //const children = root.querySelector(".children");
    //children.style.setProperty('--dropdown-item_children_open--height', this.heightChildren + "px");
  }

  render() {
    let root = document.documentElement;
    console.log("render", this.childrenOpen);
    return (
      <Host onClick={() => this.handleChangeState(this)}>
        <label>{this.label}</label>
        {this.arrowType && <i class={"arrow " + this.arrowState}></i>}
        <div
          class="children"
          style={
            {
              width:this.childrenOpen ? this.widthChildren : "0",
              height:this.childrenOpen ? this.heightChildren : "0",
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
