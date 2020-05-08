import { newSpecPage } from '@stencil/core/testing';
import { WeCheckbox } from './we-checkbox';

describe('we-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WeCheckbox],
      html: `<we-checkbox></we-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <we-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </we-checkbox>
    `);
  });
});
