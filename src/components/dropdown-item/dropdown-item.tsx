import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  State
} from '@stencil/core';

@Component({
  tag: 'we-dropdown-item',
  styleUrl: 'dropdown-item.scss',
  shadow: true
})
export class DropdownItem implements ComponentInterface {
  /** Text inside the dropdown item if you want to use a simple dropdown item with only text*/
  @Prop() label: string;
  /** Value put in payload of event triggered when dropdown item is clicked */
  @Prop() value: string;
  /** Arrow direction when dropdown is opened/closed inserted in this way: ["arrow_closed","arrow_opened"], values accepted: right, left, up, down */
  @Prop() arrow: string;
  @State() arrowState: string = this.arrow;
  /** Event triggered when dropdown item is clicked, not the arrow */
  @Event() clickItemCallback: EventEmitter;
  @State() childrenOpen: boolean;
  /** Width of the children container when is opened/closed, insert it if you want a transition of width in this way: ["width_close", "width_open"], usually the width_close is 0 */
  @Prop() width: string;
  @State() widthArray: any;
  /** Height of the children container when is opened/closed, insert it if you want a transition of height in this way: ["height_close", "height_open"], usually the height_close is 0 */
  @Prop() height: string;
  @State() heightArray: any;
  @State() style = {};
  /** In which position you want put children relative to the parent dropdown item: right, left, bottom, top <br> Choosen the position you can also modify the css variables that define the position*/
  @Prop() positionChildren = 'right';
  /** Prop update from dropdown group depend on the orientation the dropdown item is put in order to draw a line separation between them */
  @Prop() borderClass: string;

  manageTransition() {
    if (this.width) {
      this.widthArray = JSON.parse(this.width);
      this.style['width'] = this.childrenOpen ? this.widthArray[1] : this.widthArray[0];
    } else this.style['width'] = 'auto';
    if (this.height) {
      this.heightArray = JSON.parse(this.height);
      this.style['height'] = this.childrenOpen ? this.heightArray[1] : this.heightArray[0];
    } else this.style['height'] = 'auto';
  }

  componentWillLoad() {
    this.style['overflow'] = 'hidden';
    if (this.arrow) {
      const arrowArray = JSON.parse(this.arrow);
      this.arrowState = arrowArray[0];
    }
    this.manageTransition();
  }

  handleChangeState() {
    if (this.arrow) {
      const arrowArray = JSON.parse(this.arrow);
      this.arrowState = this.arrowState == arrowArray[0] ? arrowArray[1] : arrowArray[0];
    }
    this.childrenOpen = !this.childrenOpen;
    this.manageTransition();

    if (this.style['overflow'] === 'hidden') {
      setTimeout(() => {
        if (this.childrenOpen === true) this.style['overflow'] = 'unset';
      }, 500);
    } else this.style['overflow'] = 'hidden';
  }

  handleItemClicked(event: { target: HTMLInputElement }) {
    this.clickItemCallback.emit(event.target.value);
  }

  render() {
    return (
      <Host>
        <div
          class={'dropdown_item ' + this.borderClass}
          onClick={this.handleItemClicked.bind(this)}
        >
          {this.label ? <label>{this.label}</label> : <slot name="item_content"></slot>}
          {this.arrow && (
            <div class="arrowContainer" onClick={() => this.handleChangeState()}>
              <i class={'arrow ' + this.arrowState}></i>
            </div>
          )}
        </div>
        <div
          class={'children position_' + this.positionChildren}
          style={{
            width: this.style['width'],
            height: this.style['height'],
            overflow: this.style['overflow']
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
