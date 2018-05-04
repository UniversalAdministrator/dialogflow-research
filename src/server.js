const express = require('express');
const dialogflow = require('dialogflow');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const projectId = 'weather-f549d';
const sessionId = 'quickstart-session-id';

const languageCode = 'en-US';

// https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/src/v2/sessions_client.js
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: path.resolve(__dirname, '../weather-f1f38a2189f9.json')
});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/action" method="POST">
      <input type="text" name='query' placeholder='type something about weather'/>
    </form>
  `);
});

app.post('/action', (req, res) => {
  const { query } = req.body;

  console.log('/action');

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode
      }
    }
  };

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

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
