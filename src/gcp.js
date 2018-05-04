/**
 * GCP需要开启给项目开启结算功能才可以调用api
 * 
 * ERROR: { ApiError: The project to be billed has not configured billing.
    at Object.parseHttpRespBody (/Users/ldu020/workspace/dialogflow/node_modules/@google-cloud/common/src/util.js:199:30)
    at Object.handleResp (/Users/ldu020/workspace/dialogflow/node_modules/@google-cloud/common/src/util.js:137:18)
    at /Users/ldu020/workspace/dialogflow/node_modules/@google-cloud/common/src/util.js:502:12
    at Request.onResponse [as _callback] (/Users/ldu020/workspace/dialogflow/node_modules/retry-request/index.js:195:7)
    at Request.self.callback (/Users/ldu020/workspace/dialogflow/node_modules/request/request.js:186:22)
    at Request.emit (events.js:180:13)
    at Request.<anonymous> (/Users/ldu020/workspace/dialogflow/node_modules/request/request.js:1163:10)
    at Request.emit (events.js:180:13)
    at IncomingMessage.<anonymous> (/Users/ldu020/workspace/dialogflow/node_modules/request/request.js:1085:12)
    at Object.onceWrapper (events.js:272:13)
  code: 403,
  errors:
   [ { domain: 'global',
       reason: 'accountDisabled',
       message: 'The project to be billed has not configured billing.',
       locationType: 'header',
       location: 'Authorization' } ],
  response: undefined,
  message: 'The project to be billed has not configured billing.' }
 */

const Storage = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
  keyFilename: path.resolve(__dirname, '../weather-f1f38a2189f9.json')
});

const bucketName = 'my-new-bucket';

// Creates the new bucket
storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// storage
//   .getBuckets()
//   .then(results => {
//     const buckets = results[0];

//     console.log('Buckets:');
//     buckets.forEach(bucket => {
//       console.log(bucket.name);
//     });
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
