const React = require('react')
require('./styles.scss')

module.exports.ScssComponent = () => {
  return React.createElement('div', { className: 'scss-Component' }, 'Component!')
}
