import { addParameters, addDecorator } from '@storybook/html';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withPaddings } from 'storybook-addon-paddings';

addDecorator(withPaddings);

addParameters({
  paddings: [
    { name: 'Small', value: '16px', default: true },
    { name: 'Medium', value: '32px'},
    { name: 'Large', value: '64px' },
  ],
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
});