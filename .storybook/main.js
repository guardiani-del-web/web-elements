module.exports = {
  stories: ['../src/**/*.stories.*'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-notes/register',
    '@storybook/addon-viewport/register',
    'storybook-addon-paddings/register'
  ]
};