const { regexCssGlobal, regexScssGlobal } = require('./constants')

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
    return entry
  }
}

function patchClientWebpackConfig(config, options) {
  for (const rule of config.module.rules) {
    if (rule.oneOf) {
      for (const oneOfRule of rule.oneOf) {
        patchWebpackStyleRules(oneOfRule, options)
      }
    } else {
      patchWebpackStyleRules(rule, options)
    }
  }
}

function patchWebpackStyleRules(rule) {
  if (
    rule.test &&
    (rule.test.source === regexCssGlobal.source || rule.test.source === regexScssGlobal.source)
  ) {
    // Remove issuer for allow import css from 3d-party libs and locals.
    delete rule.issuer
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
