const { resolve } = require('path')
const { execSync } = require('child_process')

const arg = process.argv[2]
const version = arg.split('=')[1]

function prepareFixture(version) {
  console.log('> Pack 3d-party-library')
  execSync('npm pack', { cwd: resolve(__dirname, '__fixtures__/3d-party-library'), stdio: 'ignore' })
  console.log(`> Install next-${version} deps`)
  execSync('npm i', { cwd: resolve(__dirname, `next-${version}`), stdio: 'ignore' })
}

function runBuild(version) {
  console.log(`> Run next-${version} build`)
  execSync('npm run build', { cwd: resolve(__dirname, `next-${version}`), stdio: 'ignore' })
}

prepareFixture(version)
runBuild(version)
