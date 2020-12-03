const path = require('path')

module.exports = {
  theme: {
    color: {
      sidebarBackground: 'tomato',
      base: 'hotpink',
      baseBackground: 'crimson',

      border: 'purple',
    },
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/StyleGuideWrapper.js'),
  },
}
