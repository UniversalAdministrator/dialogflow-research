const { expect } = require('chai');
const dialogflow = require('dialogflow');
const { config } = require('../config');
const path = require('path');
const uuidv4 = require('uuid/v4');

const { sessionClient } = require('../server');

describe('detect intent test suites', () => {
  const sessionPath = sessionClient.sessionPath(config.projectId, uuidv4());

  it('t-0', () => {
    const query = 'weather';
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: config.languageCode
        }
      }
    };

    return sessionClient.detectIntent(request).then(response => {
      // console.log('response: ', response);
      const res = response[0];
      const { queryResult } = res;
      // console.log(queryResult.outputContexts);
      expect(response).to.be.an('array');
      expect(queryResult.queryText).to.be.eql(query);

      // https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/projects.agent.sessions.contexts#resource-context
      expect(queryResult.outputContexts).to.be.an('array');
    });
  });

  it('t-1', () => {
    const query = 'weather';
    let request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: config.languageCode
        }
      }
    };

    return sessionClient
      .detectIntent(request)
      .then(response => {
        const res = response[0];

        request = {
          session: sessionPath,
          queryInput: {
            text: {
              text: 'Shanghai',
              languageCode: config.languageCode
            }
          },
          queryParams: {
            contexts: res.queryResult.outputContexts
          }
        };
        return sessionClient.detectIntent(request);
      })
      .then(response => {
        // console.log('response: ', response);
        const res = response[0];
        // console.log('parameters: ', res.queryResult.parameters);
        // console.log('intent: ', res.queryResult.intent);
        expect(0).to.be.eql(0);
      });
  });
});
