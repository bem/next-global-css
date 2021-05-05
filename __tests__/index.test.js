const { resolve } = require('path')
const { execSync } = require('child_process')

function prepareFixture() {
  console.log('> Pack 3d-party-library')
  execSync('npm pack', { cwd: resolve(__dirname, '__fixtures__/3d-party-library'), stdio: 'ignore' })
  console.log('> Install next-10 deps')
  execSync('npm i', { cwd: resolve(__dirname, 'next-10'), stdio: 'ignore' })
}

function runBuild() {
  console.log('> Run next-10 build')
  execSync('npm run build', { cwd: resolve(__dirname, 'next-10'), stdio: 'ignore' })
}

prepareFixture()
runBuild()
