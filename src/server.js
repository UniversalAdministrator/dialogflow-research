const express = require('express');
const dialogflow = require('dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');
const bodyParser = require('body-parser');
const path = require('path');
const chatbase = require('@google/chatbase');
const uuidv4 = require('uuid/v4');

const weatherService = require('./weather.service');
const { config } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;
const sessionId = uuidv4();

// https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/src/v2/sessions_client.js
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: path.resolve(__dirname, '../weather-f1f38a2189f9.json')
});
const sessionPath = sessionClient.sessionPath(config.projectId, sessionId);

chatbase
  .setApiKey(config.chatbaseApiKey)
  .setPlatform('dialogflow')
  .setUserId('some-unique-user-id')
  .setVersion('1.0');

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/query" method="POST">
      <input type="text" name='query' placeholder='type something about weather'/>
    </form>
  `);
});

// How's the weather in Denver tomorrow
app.post('/query', (req, res) => {
  const { query } = req.body;
  let data = '';

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: config.languageCode
      }
    }
  };
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const { queryResult } = responses[0];
      const { queryText, fulfillmentText, intent } = queryResult;
      console.log(`  Query: ${queryText}`);
      console.log(`  Response: ${fulfillmentText}`);
      data = fulfillmentText;

      if (intent) {
        console.log(`  Intent: ${intent.displayName}`);
        return chatbase
          .newMessage()
          .setIntent(intent.displayName)
          .setMessage(fulfillmentText)
          .send();
      }
      console.log('No intent matched.');
      return chatbase
        .newMessage()
        .setAsNotHandled()
        .setMessage(fulfillmentText)
        .send();
    })
    .then(() => {
      console.log('send fulfillmentText');
      res.json({ fulfillmentText: data });
    })
    .catch(err => {
      console.error(err);
    });
});

app.post('/action', (req, res) => {
  const { queryResult = {} } = req.body;
  const { queryText } = queryResult;

  console.log('queryResult:', queryResult);

  const { parameters } = queryResult;
  const date = parameters.date;
  const city = parameters['geo-city'];

  return weatherService
    .callWeatherApi(city, date)
    .then(output => {
      res.json({ fulfillmentText: output });
    })
    .catch(err => {
      res.json({ fulfillmentText: "I don't know the weather but I hope it's good!" });
    });
});

function start(done) {
  return app.listen(PORT, () => {
    if (done) done();
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

module.exports = {
  start,
  sessionClient
};
