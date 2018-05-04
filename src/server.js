const express = require('express');
const dialogflow = require('dialogflow');

const app = express();
const port = 3000;

const projectId = 'weather-f549d';
const sessionId = 'quickstart-session-id';

const query = 'weather';
const languageCode = 'en-US';

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode
    }
  }
};

app.get('/', (req, res) => {
  res.send('app start');
});

app.post('/action', (req, res) => {
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      res.send(result.fulfillmentText);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log('No intent matched.');
      }
    })
    .catch(err => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
