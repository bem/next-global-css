const { withGlobalCss } = require('../../lib')

module.exports = withGlobalCss()({
  future: {
    webpack5: true,
  },
})
