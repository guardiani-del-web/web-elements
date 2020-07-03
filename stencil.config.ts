import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'web-elements',
  taskQueue: 'async',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'web-elements',
      proxiesFile: './dist/lib/generated/web-elements-react/src/components.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme',
      footer: ''
    },
    {
      type: 'docs-json',
      file: 'custom-elements.json'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: 'src/scss/index.scss',
  devServer: {
    openBrowser: false
  },
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()]
    })
  ]
};
