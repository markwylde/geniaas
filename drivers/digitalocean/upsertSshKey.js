const righto = require('righto')
const callarestJson = require('callarest/json')

function createSshKeyIfMissing (config, existingKey, publicKey, callback) {
  if (existingKey) {
    return callback(null, existingKey)
  }

  const sshKeys = righto(callarestJson, {
    url: 'https://api.digitalocean.com/v2/account/keys',
    method: 'post',
    body: {
      name: 'geniaas-key-' + Date.now(),
      public_key: publicKey
    },
    headers: {
      'Authorization': `Bearer ${config.token}`
    }
  })
  .get(rest => rest.body)

  sshKeys(callback)
}

function getSshKey (config, publicKey, callback) {
  const sshKey = righto(callarestJson, {
    url: 'https://api.digitalocean.com/v2/account/keys',
    headers: {
      'Authorization': `Bearer ${config.token}`
    }
  })
  .get(keys => {
    return keys.body.ssh_keys.find(key => key.public_key === publicKey)
  });

  sshKey(callback)
}

function upsertSshKey (config, sshKey, callback) {
  const maybeSshKey = righto(getSshKey, config, sshKey)
  const result = righto(createSshKeyIfMissing, config, maybeSshKey, sshKey)

  result(callback)
}

module.exports = upsertSshKey
