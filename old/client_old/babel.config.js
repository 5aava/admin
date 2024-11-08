module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        'targets': {
          'browsers': [
            '>0.25%',
            'not ie 11',
            'not op_mini all',
          ],
        },
      },
    ],
    '@babel/preset-react',
  ];

  const plugins = [
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-react-display-name',
    '@babel/plugin-transform-react-jsx-self',
    '@babel/plugin-transform-react-jsx-source',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ];

  return {
    presets,
    plugins,
  };
};
