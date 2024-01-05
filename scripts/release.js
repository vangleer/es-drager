const { execSync } = require('child_process')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const semver = require('semver')
const { prompt } = require('enquirer')
const args = require('minimist')(process.argv.slice(2))
const currentVersion = require('../package.json').version

const packages = ['drager']

const versionIncrements = ['patch', 'minor', 'major']
const step = msg => console.log(chalk.cyan(msg))
const getPkgRoot = pkg => path.resolve(__dirname, '../packages/' + pkg)

const inc = i => semver.inc(currentVersion, i)

async function main() {
  let targetVersion = args._[0]

  // 如果没有传入版本，提示选择
  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
    })

    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion
        })
      ).version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) {
    return
  }

  // update all package versions and inter-dependencies
  step('\nUpdating cross dependencies...')
  updateVersions(targetVersion)

  // publish packages
  step('\nPublishing packages...')

  for (const pkg of packages) {
    await publishPackage(pkg, targetVersion)
  }
}

main()

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version)
  // 2. update all packages
  packages.forEach(p => updatePackage(getPkgRoot(p), version))
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

async function publishPackage(pkgName, version) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    return
  }

  step(`Publishing ${pkgName}...`)
  console.log(pkgRoot, 'pkgRootpkgRoot')

  try {
    // execSync('git add .', { stdio: 'inherit' })

    // execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
    // execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
    execSync('npm publish', { cwd: pkgRoot, stdio: 'inherit' })

    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}
