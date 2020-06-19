import { ComponentInterface, Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'we-modal',
  styleUrl: 'modal.scss',
  shadow: true
})
export class Modal implements ComponentInterface {
  /** identify if modal is visible or not */
  @Prop() isVisible: boolean;
  /** Event triggered when the visibility of modal change */
  @Event() modalCallback: EventEmitter;

  handleClose(event: any) {
    this.isVisible = false;
    this.modalCallback.emit(event);
  }

  render() {
    const classVisible: string = this.isVisible ? 'visible' : '';
    return (
      <Host>
        <div class={classVisible + ' back'} onClick={this.handleClose.bind(this)}>
          <div class="modal">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
