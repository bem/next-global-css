const { globalCssRe, globalCssModulesRe } = require('./constants')

function patchServerWebpackConfig(config) {
  const originalEntry = config.entry
  config.entry = async () => {
    const entry = await originalEntry()
    const patchPath = require.resolve('./patch-global-require')
    // Prepend module with patched `require` for ignore load css files.
    if (entry['pages/_app'] && !entry['pages/_app'].includes(patchPath)) {
      entry['pages/_app'].unshift(patchPath)
    }
    if (entry['pages/_document'] && !entry['pages/_document'].includes(patchPath)) {
      entry['pages/_document'].unshift(patchPath)
    }
    return entry
  }
}

function patchCommonWebpackConfig(config) {
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

function patchWebpackStyleRules(rawRule) {
  const rules = Array.isArray(rawRule) ? rawRule : [rawRule]
  const cssRe = [...globalCssRe, ...globalCssModulesRe]

  for (const rule of rules) {
    if (rule.test && cssRe.some((reg) => reg.source === rule.test.source)) {
      // Remove issuer for allow import css from 3d-party libs and locals.
      delete rule.issuer
    }
  }
}

function patchWebpackConfig(config, { isServer }) {
  if (isServer) {
    patchServerWebpackConfig(config)
  }

  patchCommonWebpackConfig(config)

  return config
}

function withGlobalCss() {
  return (nextConfig) => {
    const config = {
      webpack: (config, { isServer }) => {
        return patchWebpackConfig(config, { isServer })
      },
    }
    return { ...nextConfig, ...config }
  }
}

module.exports = {
  withGlobalCss,
  patchWebpackConfig,
}
