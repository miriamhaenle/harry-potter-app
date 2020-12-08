const path = require('path')

module.exports = {
  theme: {
    color: {
      sidebarBackground: 'tomato',
      base: 'hotpink',
      baseBackground: '#17141d',
      border: 'purple',
    },
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/StyleGuideWrapper.js'),
  },
}
