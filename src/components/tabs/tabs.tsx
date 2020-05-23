import { ComponentInterface, Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'we-tabs',
  styleUrl: 'tabs.scss',
  shadow: true,
})
export class Tabs implements ComponentInterface {
  @Prop() enabled: boolean;

  render() {
    return (
      <Host>
        <input type="radio" id="tab1" name="tab" checked={this.enabled} />
        <label htmlFor="tab1">Features</label>
        <input type="radio" id="tab2" name="tab" />
        <label htmlFor="tab2">History</label>
        <input type="radio" id="tab3" name="tab" />
        <label htmlFor="tab3">Reviews</label>
        
        <div class="content-container">
          <div class="content" id="c1">
            <h3>Features</h3>
            <p>There really are a lot of features.</p>
          </div>
          <div class="content" id="c2">
            <h3>History</h3>
            <p>The project started in 2018 when someone needed something.</p>
          </div>
          <div class="content" id="c3">
            <h3>Reviews</h3>
            <p>Amazing product. I don't know how it works.</p>
            <i>- Anonymous</i>
          </div>
        </div>
        <div class="line"></div>
      </Host>
    );
  }

}
