const righto = require('righto')
const callarestJson = require('callarest/json')

const upsertSshKey = require('./upsertSshKey')
const waitForMachineReady = require('./waitForMachineReady')

function createMachine (config, options, sshKey, callback) {
  const machine = righto(callarestJson, {
    url: 'https://api.digitalocean.com/v2/droplets',
    method: 'post',
    body: {
      name: options.name,
      region: config.region,
      size: options.size.slug,
      image: options.image.id,
      ssh_keys: [sshKey.id]
    },
    headers: {
      'Authorization': `Bearer ${config.token}`
    }
  })
  .get(rest => {
    if (rest.response.statusCode === 202) {
      return rest.body.droplet
    }

    const error = new Error('could not create virtual machine')
    error.response = rest.response
    error.body = rest.body
    return righto.fail(error)
  })

  machine(callback)
}

function createVirtualMachine (config, options, callback) {
  if (!callback) {
    callback = options
    options = null
  }

  options = options || {}

  const sshKey = righto(upsertSshKey, config, options.sshKey)
  const droplet = righto(createMachine, config, options, sshKey)

  const machineReady = righto(waitForMachineReady, config, droplet)

  machineReady(callback)
}

module.exports = createVirtualMachine
