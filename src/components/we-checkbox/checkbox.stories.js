import { withKnobs } from '@storybook/addon-knobs';

export default { 
  title: 'Components|Checkbox',
  decorators: [withKnobs]
};

export const Basic = () => {
  return `
    <we-checkbox checked value="banana">Banana</we-checkbox>
    <we-checkbox checked disabled value="apple">Apple</we-checkbox>
    <we-checkbox disabled value="pear">Pear</we-checkbox>
  `;
}

export const WithCustomTheme = () => {
  return `
    <we-checkbox checked value="banana">Banana</we-checkbox>
    <we-checkbox checked disabled value="apple">Apple</we-checkbox>
    <we-checkbox disabled value="pear">Pear</we-checkbox>
  `;
}

Basic.story = { name: 'Basic' };
WithCustomTheme.story = { name: 'WithCustomTheme'};