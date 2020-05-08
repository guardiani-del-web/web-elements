import { newE2EPage } from '@stencil/core/testing';

describe('we-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<we-checkbox></we-checkbox>');

    const element = await page.find('we-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
