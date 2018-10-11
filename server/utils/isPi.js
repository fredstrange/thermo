function isPi () {
  return process.arch.includes('arm')
}

module.exports = isPi
