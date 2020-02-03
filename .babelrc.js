module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['ie >= 9'],
        },
        modules: process.env.BABEL_ENV === 'cjs' ? 'cjs' : false,
      },
    ],
    '@babel/preset-typescript',
  ],
};
