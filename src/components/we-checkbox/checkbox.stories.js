import { withKnobs } from '@storybook/addon-knobs';

export default { 
  title: 'Components|Checkbox',
  decorators: [withKnobs]
};

export const Basic = () => {
  return `
    <we-checkbox checked value="Banana">Banana</we-checkbox>
  `;
}

Basic.story = { name: 'Basic' };