const express = require('express');
const dialogflow = require('dialogflow');
const bodyParser = require('body-parser');
const path = require('path');

const weatherService = require('./weather.service');

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
    <form action="/query" method="POST">
      <input type="text" name='query' placeholder='type something about weather'/>
    </form>
  `);
});

app.post('/query', (req, res) => {
  const { query } = req.body;

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

// How's the weather in Denver tomorrow
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

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
