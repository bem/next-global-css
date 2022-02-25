const Module = require('module')

const { globalCssRe } = require('./constants')

Module.prototype.require = new Proxy(Module.prototype.require, {
  apply(target, thisArg, args) {
    if (globalCssRe.some((reg) => reg.test(args[0]))) {
      return ''
    }
    return Reflect.apply(target, thisArg, args)
  },
})
