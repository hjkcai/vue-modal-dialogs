module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: ['html'],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'spaced-comment': 0,
    'promise/param-names': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
