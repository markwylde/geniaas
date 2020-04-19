const righto = require('righto');
const callarestJson = require('callarest/json');

function waitForMachineReady (config, droplet, callback) {
  function isReady (callback) {
    callarestJson({
      url: `https://api.digitalocean.com/v2/droplets/${droplet.id}`,
      headers: {
        Authorization: `Bearer ${config.token}`
      }
    }, function (error, rest) {
      if (error || rest.response.statusCode !== 200) {
        const error = new Error('could not create virtual machine');
        error.response = rest.response;
        error.body = rest.body;
        return righto.fail(error);
      }

      if (rest.body.droplet.status === 'new') {
        isReady(callback);
      } else if (rest.body.droplet.status === 'active') {
        callback(null, rest.body.droplet);
      } else {
        const error = new Error(`could not detect if virtual machine was ready because its status is as unknown "${rest.body.droplet.status}"`);
        error.response = rest.response;
        error.body = rest.body;
        return righto.fail(error);
      }
    });
  }

  isReady(callback);
}

module.exports = waitForMachineReady;
