# geniaas
[![Build Status](https://travis-ci.org/markwylde/geniaas.svg?branch=master)](https://travis-ci.org/markwylde/geniaas)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/geniaas)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/geniaas)](https://github.com/markwylde/geniaas/blob/master/package.json)
[![GitHub](https://img.shields.io/github/license/markwylde/geniaas)](https://github.com/markwylde/geniaas/blob/master/LICENSE)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)

## Installation
```bash
npm install --save-dev geniaas
```

## Usage
```javascript
const digitalocean = require('geniaas/drivers/digitalocean');

// Setup the config with authentication
const providerConfig = righto(digitalocean.createProviderConfig, {
  driver: 'digitalocean',
  region: 'nyc3',
  token: 'my digitalocean secret token'
});

// Find a size to use
const sizes = righto(digitalocean.listSizes, providerConfig)
const size = sizes
  .find(size => size.slug === 's-1vcpu-1gb')

// Find an ubuntu image to use
const images = righto(digitalocean.listImages, providerConfig)
const image = images
  .find(image => image.name.includes('ubuntu-18'))

// Create the virtual machine
const machine = righto(digitalocean.createVirtualMachine, providerConfig, {
  name: 'test-image',
  size,
  image,
  sshKey: config.sshPublicKey
})

machine(function (error, machine) {
  machine.networks.v4[0].ip_address
})
```