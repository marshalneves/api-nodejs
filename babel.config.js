module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver'],
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-class-properties', { 'loose': true }],
      ["inline-dotenv",{
        path: './.env'
      }]
    ],
  }