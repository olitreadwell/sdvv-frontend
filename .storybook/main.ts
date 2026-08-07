import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  // Required
  framework: '@storybook/angular-vite',
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../projects/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  // Optional
  addons: [
    '@storybook/addon-links',
    // 'storybook-addon-angular-router',
    '@storybook/addon-docs',
  ],
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['../src/assets'],
  docs: {},
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const { default: tsconfigPaths } = await import('vite-tsconfig-paths');
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
};

export default config;
