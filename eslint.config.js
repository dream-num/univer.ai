import antfu from '@antfu/eslint-config'
import tsparser from '@typescript-eslint/parser'
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind'

export default antfu({
  ignores: [
    'submodules',
    '**/submodules/**',
  ],
  typescript: true,
  react: true,
  regexp: false,
  markdown: false,
}, {
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    'curly': ['error', 'multi-line'],
    'antfu/if-newline': 'off',
    'style/quote-props': ['error', 'as-needed'],
    'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'ts/ban-ts-comment': 'off',

    // This rule is from the univer repo.
    'ts/naming-convention': [
      'warn',
      // Interfaces' names should start with a capital 'I'.
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z0-9]',
          match: true,
        },
      },
      // Private fields of a class should start with an underscore '_'.
      {
        selector: ['classMethod', 'classProperty'],
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
    ],
  },
  languageOptions: {
    parser: tsparser,
  },
}, {
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'readable-tailwind': eslintPluginReadableTailwind,
  },
  rules: {
    // enable all recommended rules to warn
    ...eslintPluginReadableTailwind.configs.warning.rules,
    // enable all recommended rules to error
    ...eslintPluginReadableTailwind.configs.error.rules,

    // or configure rules individually
    'readable-tailwind/multiline': ['warn', { printWidth: 100 }],
  },
})
