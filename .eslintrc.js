module.exports = {
  extends: ['airbnb', 'plugin:react/recommended', 'prettier', 'prettier/react'],
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx'],
      },
    ],
    'prettier/prettier': 'error',
    'max-len': ['error', 80],
  },
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack-common-config.js',
      },
    },
  },
};
