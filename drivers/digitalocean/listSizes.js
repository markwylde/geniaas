const righto = require('righto')
const callarestJson = require('callarest/json')

function listSizes (config, options, callback) {
  if (!callback) {
    callback = options
    options = null
  }

  options = options || {}

  const sizes = righto(callarestJson, {
    url: 'https://api.digitalocean.com/v2/sizes?per_page=200',
    headers: {
      'Authorization': `Bearer ${config.token}`
    }
  })
  .get(sizes => {
    if (sizes.response.statusCode === 200) {
      return sizes.body.sizes
    }

    const error = new Error('could not list sizes')
    error.response = sizes.response
    error.body = sizes.body
    return righto.fail(error)
  })

  sizes(callback)
}

module.exports = listSizes
