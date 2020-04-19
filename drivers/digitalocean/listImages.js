const righto = require('righto')
const callarestJson = require('callarest/json')

function listImages (config, options, callback) {
  if (!callback) {
    callback = options
    options = null
  }

  options = options || {}

  const images = righto(callarestJson, {
    url: 'https://api.digitalocean.com/v2/images?per_page=200',
    headers: {
      'Authorization': `Bearer ${config.token}`
    }
  })
  .get(images => {
    if (images.response.statusCode === 200) {
      return images.body.images
    }

    const error = new Error('could not list images')
    error.response = images.response
    error.body = images.body
    return righto.fail(error)
  })

  images(callback)
}

module.exports = listImages
