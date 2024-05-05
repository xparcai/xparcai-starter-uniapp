const uniapp = require('@uni-helper/eslint-config')

module.exports = uniapp(
  {
    unocss: true,
    gitignore: true,
    ignores: [
      '**/plugin-*.d.ts',
    ],
    overrides: {
      vue: {
        'vue/block-order': [
          'error',
          {
            order: ['route', 'script', 'template', 'style'],
          },
        ],
      },
    },
  },
  {
    rules: {
      'no-console': 'off',
      'no-new': 'off',
    },
  },
)
