import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State
} from "@stencil/core";

@Component({
  tag: "we-dropdown-item",
  styleUrl: "dropdown-item.scss",
  shadow: true,
})
export class DropdownItem implements ComponentInterface {
  @Prop() label: string = "";
  @Prop() arrow: string = ""
  @State() arrowState: string = this.arrow;
  @Event() clickCallback: EventEmitter;
  @State() childrenOpen: boolean = false;

  @Prop() width: string = "";
  @State() widthArray: any;
  @Prop() height: string = "";
  @State() heightArray: any;
  @State() style: any = {}
  @Prop() positionChildren: string = "right";

  @Prop() marginClass: string = "";

  manageTransition() {
    if(this.width) {
      this.widthArray = JSON.parse(this.width);
      this.style['width'] = this.childrenOpen
        ? this.widthArray[1]
        : this.widthArray[0]
      } else 
      this.style['width'] = 'auto';
    if(this.height){
      this.heightArray = JSON.parse(this.height);
      console.log("manageTransiton",this.heightArray,this.childrenOpen)
      this.style['height'] = this.childrenOpen
        ? this.heightArray[1]
        : this.heightArray[0]
      } else
      this.style['height'] = 'auto';
  }

  componentWillLoad() {
    this.style['overflow'] = "hidden";
    if(this.arrow) {
      const arrowArray = JSON.parse(this.arrow);
    this.arrowState = arrowArray[0];
    }
    this.manageTransition();
  }

  componentWillUpdate(){
    this.manageTransition();
  }

  handleChangeState() {
    if(this.arrow) {
      const arrowArray = JSON.parse(this.arrow);
    this.arrowState =
      this.arrowState == arrowArray[0]
        ? arrowArray[1]
        : arrowArray[0];
    }
    this.childrenOpen = !this.childrenOpen;
    this.manageTransition();
    
    if (this.style['overflow'] === "hidden") {
      setTimeout(() => {
        if (this.childrenOpen === true) this.style['overflow'] = "unset";
      }, 500);
    } else this.style['overflow'] = "hidden";
  }

  render() {
    console.log("style",this.style)
    return (
      <Host>
        <div class={"dropdown_item " +this.marginClass} onClick={() => this.handleChangeState()} >
          <label>{this.label}</label>
          {this.arrow && <i class={"arrow " + this.arrowState}></i>}
        </div>
        <div
          class={"children position_" + this.positionChildren}
          style={{
            width:this.style['width'],
            height:this.style['height'],
            overflow:this.style['overflow']
        }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
