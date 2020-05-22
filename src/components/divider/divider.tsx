import { ComponentInterface, Component, h } from '@stencil/core';

@Component({
  tag: 'we-divider',
  shadow: true,
  styleUrl: 'divider.scss'
})
export class Divider implements ComponentInterface {

  render() {
    return (
      <div>
        <hr />
      </div>
    );
  }

}
