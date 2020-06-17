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
  /** Value passed on event when chips selected or removed */
  @Prop() value: string;
  /** Center text written inside the chips if you want a text inside the chips */
  @Prop() label: string;
  /** Src of img you want to put in left side of chips if you want an image in that position*/
  @Prop() srcImgLeft: string;
  /** Src of img you want to put in right side of chips if you want an image in that position */
  @Prop() srcImgRight: string;
  /** If true the chips will be removed when user click on left image inside chips and removeCallback event is triggered */
  @Prop() removeLeft: boolean;
  /** If true the chips will be removed when user click on right image inside chips and removeCallback event is triggered */
  @Prop() removeRight: boolean;
  @State() isVisible:boolean = true;
  /** Event triggered when the chips is removed */
  @Event() removeCallback: EventEmitter;
  /** If true user can select the chips and selectCallback event is triggered */
  @Prop() isSelectable: boolean;
  @State() isSelected: boolean;
  /** Event triggered when the chips is selected */
  @Event() selectCallback: EventEmitter;

  handleRemoveChips(side) {
    if ((this.removeRight && side === 'right') || (this.removeLeft && side === 'left')) {
      this.isVisible = !this.isVisible;
      this.removeCallback.emit(this.value);
    }
  }

  handleSelectedChips() {
    console.log('handlechips', this.isSelectable)
    if (this.isSelectable) {
      this.isSelected = !this.isSelected;
      this.selectCallback.emit(this.value);
    }
  }

  render() {
    if (this.isVisible)
      return (
        <Host>
          <div
            class={'chips ' + (this.isSelected && 'selected')}
            onClick={() => this.handleSelectedChips()}
          >
            {this.srcImgLeft && (
              <img
                class="imageLeft"
                src={this.srcImgLeft}
                onClick={() => this.handleRemoveChips('left')}
              />
            )}
            {this.label && <label>{this.label}</label>}
            {this.srcImgRight && (
              <img
                class="imageRight"
                src={this.srcImgRight}
                onClick={() => this.handleRemoveChips('right')}
              />
            )}
          </div>
        </Host>
      );
  }
}
