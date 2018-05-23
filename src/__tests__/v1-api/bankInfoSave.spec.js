const { expect } = require('chai');
const request = require('request-promise');
const uuidv4 = require('uuid/v4');
const dialogflow = require('dialogflow');

const { rp } = require('../../util');

const clientAccessToken = '205cd489507a4a2d8a14c8cea4677020';
const sessionId = uuidv4();
const projectId = 'slate-52a0c';

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

describe('bankInfoSave test suites', () => {
  const contexts = [
    {
      name: `projects/${projectId}/agent/sessions/${sessionId}/contexts/bank_info`,
      lifespanCount: 5,
      parameters: {
        address: '1234 Main St. Suite 27, Chicago, IL',
        bankAcctNo: '24555555',
        routingNo: '065200861',
        'secondInput.original': '24555555',
        activityName: '2324',
        bankName: 'BANK OF ABBEVILLE & TRUST COMPANY',
        workflowName: 'onboarding',
        firstInput: '24555555',
        'activityName.original': '',
        userId: '100021832360184',
        'address.original': '',
        secondInput: '24555555',
        'routingNo.original': '065200861',
        'workflowName.original': '',
        'firstInput.original': '',
        'taskName.original': 'XCz',
        taskName: 'XCz',
        //
        activityId: 'payroll',
        workflowId: 'onboarding',
        taskId: 'eft',
        completed: true
      }
    }
  ];

  // it('t-0', () => {
  //   const qs = {
  //     query: 'slideshowp2',
  //     sessionId,
  //     contexts
  //   };
  //   return rp('/query', qs).then(res => {
  //     console.log(res);
  //     expect(0).to.be.equal(0);
  //   });
  // });

  it('t-1', () => {
    const req = {
      session: sessionPath,
      queryInput: {
        text: {
          text: 'slideshowp2',
          languageCode: 'en-US'
        }
      },
      queryParams: {
        contexts
      }
    };

    sessionClient
      .detectIntent(req)
      .then(responses => {
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log('  No intent matched.');
        }
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  });
});
