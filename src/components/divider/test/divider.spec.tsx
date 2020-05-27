import { newSpecPage } from '@stencil/core/testing';
import { Divider } from './divider';

describe('divider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<divider></divider>`,
    });
    expect(page.root).toEqualHtml(`
      <divider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </divider>
    `);
  });
});
