const drivers = require('./drivers')

function createProviderConfig (options, callback) {
  if (drivers[options.driver]) {
    return drivers[options.driver].createProviderConfig(options, callback)
  }

  callback(new Error(`${options.driver} driver not found`))
}

module.exports = {
  createProviderConfig
};
