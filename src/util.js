const request = require('request-promise');

const { config } = require('./config');

// https://dialogflow.com/docs/reference/agent/
function rp(uri, qs) {
  const options = {
    uri: config.API_V1_URL + uri,
    headers: {
      Authorization: `Bearer ${config.clientAccessToken}`
    },
    qs: {
      v: 20170712,
      ...qs,
      lang: 'en'
    },
    json: true
  };
  return request(options);
}

exports.rp = rp;
