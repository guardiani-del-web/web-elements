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

export interface ChipsValueRemove {
  value: string;
}

export interface ChipsValueSelect {
  value: string;
  isSelected: boolean;
}

@Component({
  tag: 'we-chips',
  styleUrl: 'chips.scss',
  shadow: true
})
export class Chips implements ComponentInterface {
  /** Value passed on event when chips selected or removed */
  @Prop() value!: string;
  /** Center text written inside the chips if you want a text inside the chips */
  @Prop() label: string;
  /** Src of img you want to put in left side of chips if you want an image in that position*/
  @Prop() srcImgLeft: string;
  /** Src of img you want to put in right side of chips if you want an image in that position */
  @Prop() srcImgRight: string;
  /** If true the chips will be removed when user click on left image inside chips and removeChipsCallback event is triggered */
  @Prop() removeLeft: boolean;
  /** If true the chips will be removed when user click on right image inside chips and removeChipsCallback event is triggered */
  @Prop() removeRight: boolean;
  @State() isVisible = true;
  /** Event triggered when the chips is removed */
  @Event() removeChipsCallback: EventEmitter<ChipsValueRemove>;
  /** If true user can select the chips and selectChipsCallback event is triggered */
  @Prop() isSelectable: boolean;
  @State() isSelected: boolean;
  /** Event triggered when the chips is selected */
  @Event() selectChipsCallback: EventEmitter<ChipsValueSelect>;

  handleRemoveChips(side) {
    if ((this.removeRight && side === 'right') || (this.removeLeft && side === 'left')) {
      this.isVisible = !this.isVisible;
      this.removeChipsCallback.emit({ value: this.value });
    }
  }

  handleSelectedChips() {
    if (this.isVisible) {
      if (this.isSelectable) {
        this.isSelected = !this.isSelected;
        this.selectChipsCallback.emit({ value: this.value, isSelected: this.isSelected });
      }
    } else if (this.isSelectable) {
      this.isSelected = false;
      this.selectChipsCallback.emit({ value: this.value, isSelected: this.isSelected });
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
