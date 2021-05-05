const React = require('react')
require('./styles.css')

module.exports.Component = () => {
  return React.createElement('div', { className: 'Component' }, 'Component!')
}
