function createProviderConfig (options, callback) {
  if (!options.region) {
    return callback(new Error('region is required'));
  }

  if (!options.token) {
    return callback(new Error('token is required'));
  }

  callback(null, {
    driver: 'digitalocean',
    region: options.region,
    token: options.token
  });
}

module.exports = createProviderConfig;
