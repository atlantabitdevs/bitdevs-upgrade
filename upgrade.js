const ncp = require('ncp').ncp
const rimraf = require('rimraf')
const path = require('path')

const source = './tmp-template'
const destination = '.'

ncp.filter = function (filePath) {
  const relPath = path.relative(source, filePath)

  // List of paths to exclude
  const exclusions = ['content', 'public', 'summaries', '.git']

  // Check if the relative path starts with any of the exclusions
  for (let exclusion of exclusions) {
    if (relPath === exclusion || relPath.startsWith(exclusion + path.sep)) {
      return false
    }
  }

  return true
}

ncp(source, destination, function (err) {
  if (err) {
    return console.error(err)
  }
  rimraf.sync('./tmp-template')
  console.log('Upgrade complete!')
})
