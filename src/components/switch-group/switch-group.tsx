import { ComponentInterface, Component, Host, h, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'we-switch-group',
  styleUrl: 'switch-group.scss',
  shadow: true
})
export class SwitchGroup implements ComponentInterface {
  @Element() el: HTMLElement;
  /** Name that identify this switch group */
  @Prop() name!: any;
  /** Function called when a switch inside change it's state */
  @Prop() changeSwitchCallback: any;
  @State() childrenState: Array<any> = [];

  findAllChildren() {
    const items = this.el.querySelectorAll(':scope > we-switch');
    console.log('findAllChildren', items);
    console.log('findAllChildren 2', items[0], items[0].getAttribute('name'));
    const children = [];
    items.forEach(i =>{
      children.push({name: i.getAttribute('name'), checked: i.getAttribute('checked')})
    });
    this.childrenState.push({name:this.name, children});
  }

  componentDidLoad() {
    this.findAllChildren();
  }

  componentDidUpdate() {
    this.findAllChildren();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
