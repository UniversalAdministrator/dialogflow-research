const { expect } = require('chai');

const uuidv4 = require('uuid/v4');
const { config } = require('../../config');
const util = require('util');
const { rp } = require('../../util');

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
    return rp('/query', qs)
      .then(res => {
        const nextQs = {
          contexts: res.result.contexts,
          query: 'shanghai',
          sessionId
        };
        return rp('/query', nextQs);
      })
      .then(res => {
        // console.log(util.inspect(res, false, 5));
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

  it('should get correct response from dialogflow when send a query with contexts', () => {
    const contexts = [
      {
        name: `projects/${config.projectId}/agent/sessions/${sessionId}/contexts/me`,
        lifespanCount: 5,
        parameters: {
          name: 'mrdulin'
        }
      }
    ];
    const qs = {
      query: 'who am I',
      sessionId,
      contexts
    };
    return rp('/query', qs).then(res => {
      // console.log(res);
      expect(res.sessionId).to.be.eql(sessionId);
      expect(res.status).to.have.property('code', 200);
      expect(res.status).to.have.property('errorType', 'success');
      expect(res.result.fulfillment.speech).to.be.equal('Your name is mrdulin.');
    });
  });
});
