const { regexCssGlobal } = require('./constants')
const { color } = require('./color')

function patchServerWebpackConfig(config) {
  const originalEntry = config.entry
  config.entry = async () => {
    const entry = await originalEntry()
    const patchPath = require.resolve('./patch-global-require')
    // Prepend module with patched `require` for ignore load css files.
    if (!entry['pages/_app'].includes(patchPath)) {
      entry['pages/_app'].unshift(patchPath)
    }
    if (!entry['pages/_document'].includes(patchPath)) {
      entry['pages/_document'].unshift(patchPath)
    }
    console.log(`${color.cyan('info')}  - Enabled global css for node_modules (server).`)
    return entry
  }
}

function patchClientWebpackConfig(config) {
  for (const rule of config.module.rules) {
    if (rule.oneOf) {
      for (const oneOfRule of rule.oneOf) {
        patchWebpackStyleRules(oneOfRule)
      }
    } else {
      patchWebpackStyleRules(rule)
    }
  }
}

function patchWebpackStyleRules(rule) {
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

function withGlobalCss() {
  return (nextConfig) => {
    const config = {
      webpack: (config, { isServer }) => {
        if (isServer) {
          patchServerWebpackConfig(config)
        } else {
          patchClientWebpackConfig(config)
        }
        return config
      },
    }
    return { ...nextConfig, ...config }
  }
}

module.exports = { withGlobalCss }
