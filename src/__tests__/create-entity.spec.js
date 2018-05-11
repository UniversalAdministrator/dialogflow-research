const { expect } = require('chai');
const dialogflow = require('dialogflow');
const { config } = require('../config');
const path = require('path');

describe('create entity test suites', () => {
  const keyFilename = path.resolve(__dirname, '../../weather-f1f38a2189f9.json');
  const entityTypesClient = new dialogflow.EntityTypesClient({ keyFilename });
  const intentsClient = new dialogflow.IntentsClient({ keyFilename });

  const agentPath = intentsClient.projectAgentPath(config.projectId);

  it('t-0', () => {
    // https://dialogflow.com/docs/reference/api-v2/rpc/google.cloud.dialogflow.v2#google.cloud.dialogflow.v2.CreateEntityTypeRequest
    const sizeRequest = {
      parent: agentPath,
      // https://dialogflow.com/docs/reference/api-v2/rpc/google.cloud.dialogflow.v2#google.cloud.dialogflow.v2.EntityType
      entity_type: {
        displayName: 'size',
        // https://dialogflow.com/docs/reference/api-v2/rpc/google.cloud.dialogflow.v2#google.cloud.dialogflow.v2.EntityType.Kind
        kind: 'KIND_MAP',
        // https://dialogflow.com/docs/reference/api-v2/rpc/google.cloud.dialogflow.v2#google.cloud.dialogflow.v2.EntityType.AutoExpansionMode
        auto_expansion_mode: 'AUTO_EXPANSION_MODE_UNSPECIFIED',
        entities: [
          // https://dialogflow.com/docs/reference/api-v2/rpc/google.cloud.dialogflow.v2#google.cloud.dialogflow.v2.EntityType.Entity
          { value: 'small', synonyms: ['small', 'petit'] },
          { value: 'medium', synonyms: ['medium'] },
          { value: 'large', synonyms: ['large', 'big'] }
        ]
      }
    };

    return entityTypesClient.createEntityType(sizeRequest).then(responses => {
      const res = responses[0];
      console.log(res);
      expect(0).to.be.eql(0);
    });
  });
});

/**
 * 1) create entity test suites
       t-0:
     Error: 7 PERMISSION_DENIED: IAM permission 'dialogflow.entityTypes.create' on 'projects/weather-f549d/agent' denied.
      at Object.exports.createStatusError (node_modules/grpc/src/common.js:87:15)
      at Object.onReceiveStatus (node_modules/grpc/src/client_interceptors.js:1214:28)
      at InterceptingListener._callNext (node_modules/grpc/src/client_interceptors.js:590:42)
      at InterceptingListener.onReceiveStatus (node_modules/grpc/src/client_interceptors.js:640:8)
      at callback (node_modules/grpc/src/client_interceptors.js:867:24)
 */
