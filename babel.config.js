module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions'],
        node: 'current',
      },
      loose: true,
      useBuiltIns: 'usage',
    }],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  env: {
    production: {
      plugins: [
        
      ],
    },
  },
}
