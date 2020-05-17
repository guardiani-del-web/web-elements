import { create } from '@storybook/theming/create';
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import brandImage from '../brand/logo.png';

const weTheme = create({
  base: themes.light,
  appBorderRadius: 4,
  brandTitle: 'Web Elements 💎',
  brandUrl: 'https://github.com/grandemayta/web-elements',
  brandImage
});

addons.setConfig({
  theme: weTheme
});