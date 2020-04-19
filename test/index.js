const righto = require('righto');
const test = require('righto-tape');
const digitalocean = require('../drivers/digitalocean');

const config = require('./privateTestConfig');

righto._debug = true;

test('digitalocean - success workflow', function * (t) {
  t.plan(1);

  const providerConfig = yield righto(digitalocean.createProviderConfig, {
    driver: 'digitalocean',
    region: 'nyc3',
    token: config.digitalOceanToken
  });

  const sizes = yield righto(digitalocean.listSizes, providerConfig);
  const size = sizes
    .find(size => size.slug === 's-1vcpu-1gb');

  const images = yield righto(digitalocean.listImages, providerConfig);
  const image = images
    .find(image => image.name.includes('ubuntu-18'));

  const machine = yield righto(digitalocean.createVirtualMachine, providerConfig, {
    name: 'test-image',
    size,
    image,
    sshKey: config.sshPublicKey
  });

  // const machine = yield righto(digitalocean.waitForMachineReady, providerConfig, {
  //   id: 189152970,
  // })

  t.ok(machine.networks.v4[0].ip_address);
});
