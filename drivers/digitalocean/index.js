module.exports = {
  title: 'Digital Ocean',
  url: 'https://www.digitalocean.com',

  waitForMachineReady: require('./waitForMachineReady'),

  createProviderConfig: require('./createProviderConfig'),
  createVirtualMachine: require('./createVirtualMachine'),
  listSizes: require('./listSizes'),
  listImages: require('./listImages')
};
