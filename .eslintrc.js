module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
      project: '.',
    },
  },
  extends: ['standard', 'airbnb-base', 'prettier', 'plugin:sonarjs/recommended-legacy', "plugin:promise/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'spellcheck', 'sonarjs'],
  rules: {
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',

    camelcase: 'error',
    'no-useless-constructor': 'error',
    'no-empty-function': 'error',
    'no-underscore-dangle': 'error',
    'import/no-extraneous-dependencies': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true, ignoreVoid: true }],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'error',
    curly: ['error', 'all'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-magic-numbers': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'no-delete-var': 'error',
    'no-const-assign': 'error',
    'no-unreachable': 'error',
    'max-lines': ['error', { max: 400, skipBlankLines: true, skipComments: true }],
    'max-depth': ['error', 3],
    'max-lines-per-function': ['error', { max: 400, skipBlankLines: true, skipComments: true }],
    'max-params': ['error', { max: 4 }],
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    'id-length': [2, { min: 3, properties: 'never', exceptions: ['id'] }],
    'no-magic-numbers': ['warn', { ignoreArrayIndexes: true, ignore: [0, 1] }],
    'no-alert': 'error',
    'spellcheck/spell-checker': [
      1,
      {
        comments: false,
        strings: false,
        templates: false,
        identifiers: true,
        lang: 'en_US',
        skipWords: ['valorant'],
        minLength: 3,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^[A-Za-z]{1,}Interface$',
          match: true,
        },
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '^[A-Za-z]{1,}Enum$',
          match: true,
        },
      },
    ],
    indent: ['error', 2],
  },
  overrides: [
    {
      files: ['*\\.spec.ts'],
      rules: {},
    },
  ],
};