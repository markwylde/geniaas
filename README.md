# geniaas
[![Build Status](https://travis-ci.org/markwylde/geniaas.svg?branch=master)](https://travis-ci.org/markwylde/geniaas)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/geniaas)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/geniaas)](https://github.com/markwylde/geniaas/blob/master/package.json)
[![GitHub](https://img.shields.io/github/license/markwylde/geniaas)](https://github.com/markwylde/geniaas/blob/master/LICENSE)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)

Generic IaaS library for running basic functions on cloud providers, such as creating and destroying virtual machines.

## Installation
```bash
npm install --save-dev geniaas
```

## Usage
### righto
```javascript
const digitalocean = require('geniaas/drivers/digitalocean');

// Setup the config with authentication
const providerConfig = righto(digitalocean.createProviderConfig, {
  driver: 'digitalocean',
  region: 'nyc3',
  token: 'my digitalocean secret token'
});

// Find a size to use
const size = righto(digitalocean.listSizes, providerConfig)
  .get(sizes => {
    return sizes.find(sizes=> size.slug === 's-1vcpu-1gb')
  })

// Find an ubuntu image to use
const image = righto(digitalocean.listImages, providerConfig)
  .get(images => {
    return images.find(images=> image.name.includes('ubuntu-18'))
  })

// Create the virtual machine
const machineOptions = righto.resolve({
  name: 'test-image',
  size,
  image,
  sshKey: config.sshPublicKey
})
const machine = righto(digitalocean.createVirtualMachine, providerConfig, machineOptions)

machine(function (error, machine) {
  console.log(`The ip address of your new machine is: ${machine.networks.v4[0].ip_address}`)
})
```

### promises
```javascript
const digitalocean = require('geniaas/drivers/digitalocean/promises')

async function main () {
  // Setup the config with authentication
  const providerConfig = await digitalocean.createProviderConfig({
    driver: 'digitalocean',
    region: 'nyc3',
    token: 'my digitalocean secret token'
  });

  // Find a size to use
  const sizes = await digitalocean.listSizes(providerConfig)
  const size = sizes.find(sizes => size.slug === 's-1vcpu-1gb')

  // Find an ubuntu image to use
  const images = await digitalocean.listImages(providerConfig)
  const image = images.find(images => image.name.includes('ubuntu-18'))

  // Create the virtual machine
  const machineOptions = {
    name: 'test-image',
    size,
    image,
    sshKey: config.sshPublicKey
  }
  const machine = await digitalocean.createVirtualMachine(providerConfig, machineOptions)

  console.log(`The ip address of your new machine is: ${machine.networks.v4[0].ip_address}`)
}
```