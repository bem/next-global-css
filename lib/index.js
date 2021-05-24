const { regexCssGlobal } = require('./constants')
const { color } = require('./color')

function patchServerStyles(config) {
  const originalEntry = config.entry
  config.entry = async () => {
    const entry = await originalEntry()
    const patchPath = require.resolve('./patch-global-require')
    // Prepend module with patched `require` for ignore load css files.
    entry['pages/_app'].unshift(patchPath)
    entry['pages/_document'].unshift(patchPath)
    console.log(`${color.cyan('info')}  - Enabled global css for node_modules (server).`)
    return entry
  }
}

function patchClientStyles(config) {
  // FIXME: Handle all rules not only 1th.
  const rules = config.module.rules[1].oneOf
  for (const rule of rules) {
    if (rule.test && rule.test.source === regexCssGlobal.source) {
      if (Array.isArray(rule.issuer.not)) {
        for (const idx in rule.issuer.not) {
          if (rule.issuer.not[idx].source === 'node_modules') {
            // Remove `node_modules` from issuer for allow import css from 3d-party libs.
            rule.issuer.not.splice(idx, 1)
            console.log(`${color.cyan('info')}  - Enabled global css for node_modules (client).`)
          }
        }
      }
    }
  }
}

function withGlobalCss() {
  return {
    webpack: (config, { isServer }) => {
      if (isServer) {
        patchServerStyles(config)
      } else {
        patchClientStyles(config)
      }
      return config
    },
  }
}

module.exports = { withGlobalCss }
