const cyan = '\x1b[36m'
const reset = '\x1b[0m'

const color = {
  cyan: (text) => `${cyan}${text}${reset}`,
}

module.exports = { color }
