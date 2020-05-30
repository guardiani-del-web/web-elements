import { newSpecPage } from '@stencil/core/testing';
import { Card } from './card';

describe('card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Card],
      html: `<card></card>`,
    });
    expect(page.root).toEqualHtml(`
      <card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </card>
    `);
  });
});
