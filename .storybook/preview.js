import { addParameters, addDecorator } from '@storybook/web-components';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withPaddings } from 'storybook-addon-paddings';
import { withA11y } from '@storybook/addon-a11y';
import '@storybook/addon-console';

addDecorator(withPaddings);
addDecorator(withA11y);

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