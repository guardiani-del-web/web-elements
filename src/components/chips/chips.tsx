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
  tag: "we-chips",
  styleUrl: "chips.scss",
  shadow: true,
})
export class Chips implements ComponentInterface {
  @Prop() label: string = "";
  @Prop() srcImgLeft: string = "";
  @Prop() srcImgRight: string = "";
  @Prop() removeLeft: boolean = false;
  @Prop() removeRight: boolean = false;
  @State() isVisible: boolean = true;
  @Event() removeCallback: EventEmitter;
  @Prop() isSelectable: boolean = false;
  @State() isSelected: boolean = false;
  @Event() selectCallback: EventEmitter;
  

  handleRemoveChips(event) {
    this.isVisible = !this.isVisible;
    this.removeCallback.emit(event);
  }

  handleSelectedChips(event) {
    this.isSelected = !this.isSelected;
    this.selectCallback.emit(event);
  }

  render() {
    if (this.isVisible)
      return (
        <Host>
          <div class={"chips " + (this.isSelected && "selected")} onClick={this.isSelectable && this.handleSelectedChips.bind(this)}>
            {this.srcImgLeft && (
              <img
                class="imageLeft"
                src={this.srcImgLeft}
                onClick={this.removeLeft && this.handleRemoveChips.bind(this)}
              />
            )}
            {this.label && <label>{this.label}</label>}
            {this.srcImgRight && (
              <img
                class="imageRight"
                src={this.srcImgRight}
                onClick={this.removeRight && this.handleRemoveChips.bind(this)}
              />
            )}
          </div>
        </Host>
      );
  }
}
