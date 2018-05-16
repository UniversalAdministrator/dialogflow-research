const {
  expect
} = require('chai');
const request = require('request-promise');
const uuidv4 = require('uuid/v4');
const {
  config
} = require('../../config');
const util = require('util');

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

const sessionId = uuidv4();

describe('/query test suites', () => {
  it('should get correct response from dialogflow when send a query without location', () => {
    const qs = {
      query: 'weather',
      sessionId
    };
    return rp('/query', qs).then(res => {
      // console.log(res);
      expect(res.sessionId).to.be.eql(sessionId);
      expect(res.status).to.have.property('code', 200);
      expect(res.status).to.have.property('errorType', 'success');
      expect(res.result.metadata.intentName).to.be.eql('weather');
      expect(res.result.fulfillment.speech).to.be.eql('For what city would you like the weather?');
    });
  });

  it('should get correct response from dialogflow when send a query without location firstly, and send a location secondly', () => {
    const qs = {
      query: 'weather',
      sessionId
    };
    return rp('/query', qs).then(res => {
      const nextQs = {
        contexts: res.result.contexts,
        query: 'shanghai',
        sessionId
      };
      return rp('/query', nextQs);
    }).then((res) => {
      console.log(util.inspect(res, false, 5));
      expect(res.sessionId).to.be.eql(sessionId);
    });
  });

  it('should get correct response from dialogflow when send a query with location', () => {

    const qs = {
      query: 'weather in shanghai',
      sessionId
    };
    return rp('/query', qs).then(res => {
      // console.log(res);
      expect(res.sessionId).to.be.eql(sessionId);
      expect(res.status).to.have.property('code', 200);
      expect(res.status).to.have.property('errorType', 'success');
      expect(res.result.metadata.intentName).to.be.eql('weather');
      expect(res.result.parameters).to.have.property('geo-city', 'Shanghai');
    });
  });

});


// bank_account_num_complete
// bank_info