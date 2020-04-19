const {promisify} = require('util');

module.exports = {
  title: 'Digital Ocean',
  url: 'https://www.digitalocean.com',

  waitForMachineReady: promisify(require('./waitForMachineReady')),

  createProviderConfig: promisify(require('./createProviderConfig')),
  createVirtualMachine: promisify(require('./createVirtualMachine')),
  listSizes: promisify(require('./listSizes')),
  listImages: promisify(require('./listImages'))
};
