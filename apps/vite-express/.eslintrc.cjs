module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': 'vue-eslint-parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'tsx': true,
    },
    'vueFeatures': {
      'filter': true,
      'jsx': true,
    },
  },
  'plugins': [
    'vue',
    '@typescript-eslint'
  ],
  'rules': {
    'array-bracket-spacing': [2, 'never'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
