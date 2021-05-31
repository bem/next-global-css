const Module = require('module')

const { regexCssGlobal, regexScssGlobal } = require('./constants')

Module.prototype.require = new Proxy(Module.prototype.require, {
  apply(target, thisArg, args) {
    if (regexCssGlobal.test(args[0]) || regexScssGlobal.test(args[0])) {
      return ''
    }
    return Reflect.apply(target, thisArg, args)
  },
})
