import {
  ComponentInterface,
  Component,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter
} from '@stencil/core';

@Component({
  tag: 'we-chips',
  styleUrl: 'chips.scss',
  shadow: true
})
export class Chips implements ComponentInterface {
  /** Center text written inside the chips if you want a text inside the chips */
  @Prop() label = '';
  /** Src of img you want to put in left side of chips if you want an image in that position*/
  @Prop() srcImgLeft = '';
  /** Src of img you want to put in right side of chips if you want an image in that position */
  @Prop() srcImgRight = '';
  /** If true the chips will be removed when user click on left image inside chips and removeCallback event is triggered */
  @Prop() removeLeft = false;
  /** If true the chips will be removed when user click on right image inside chips and removeCallback event is triggered */
  @Prop() removeRight = false;
  @State() isVisible = true;
  /** Event triggered when the chips is removed */
  @Event() removeCallback: EventEmitter;
  /** If true user can select the chips and selectCallback event is triggered */
  @Prop() isSelectable = false;
  @State() isSelected = false;
  /** Event triggered when the chips is selected */
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
          <div
            class={'chips ' + (this.isSelected && 'selected')}
            onClick={this.isSelectable && this.handleSelectedChips.bind(this)}
          >
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
