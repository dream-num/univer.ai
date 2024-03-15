import antfu from '@antfu/eslint-config'
import tsParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'

import astro from 'eslint-plugin-astro'

const rules = {
  curly: ['error', 'multi-line'],
  'style/quote-props': ['error', 'as-needed'],
  'style/jsx-indent': 'off',
  'style/jsx-one-expression-per-line': 'off',
  'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
  'antfu/if-newline': 'off',
  'import/default': 'off',
  'import/order': [
    'error',
    {
      warnOnUnassignedImports: true,
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
}

export default antfu({
  react: true,
  yaml: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'dprint',
  },

  rules,
}, {
  files: ['**/*.astro'],
  plugins: {
    astro,
  },
  rules: {
    ...astro.configs.recommended.rules,
    ...rules,
  },
  languageOptions: {
    parser: astroParser,
    globals: {
      astroHTML: true,
    },
    parserOptions: {
      parser: tsParser,
      extraFileExtensions: ['.astro'],
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
})
