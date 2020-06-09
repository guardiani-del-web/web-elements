import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  Element,
} from "@stencil/core";

@Component({
  tag: "we-dropdown-group",
  styleUrl: "dropdown-group.scss",
  shadow: true,
})
export class DropdownGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  /** Define the orientation of the objects inside this group, "column" or "row" */
  @Prop() orientation: string = "column";

  componentDidLoad() {
    const items = this.el.querySelectorAll(":scope > we-dropdown-item");
    for (let i = 0; i < items.length - 1; i++) {
      if (this.orientation === "column")
        items[i].setAttribute("border-class", "border_bottom");
      else items[i].setAttribute("border-class", "border_right");
    }
  }

  render() {
    return (
      <Host class={this.orientation}>
        <slot></slot>
      </Host>
    );
  }
}
