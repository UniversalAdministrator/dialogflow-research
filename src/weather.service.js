const rp = require('request-promise');

const host = 'api.worldweatheronline.com';
const wwoApiKey = '26ae986a760842279b974932180305';

function callWeatherApi(city, date) {
  const uri = `http://${host}/premium/v1/weather.ashx`;

  return rp({
    uri,
    qs: {
      format: 'json',
      num_of_days: '1',
      q: encodeURIComponent(city),
      key: wwoApiKey,
      date
    },
    json: true
  }).then(response => {
    const { data } = response;
    const { weather, request, current_condition } = data;
    const forecast = weather[0];
    const location = request[0];
    const conditions = current_condition[0];
    const { weatherDesc } = conditions;
    const currentConditions = weatherDesc[0].value;

    const output = `Current conditions in the ${location.type} 
            ${location.query} are ${currentConditions} with a projected high of
            ${forecast.maxtempC}°C or ${forecast.maxtempF}°F and a low of 
            ${forecast.mintempC}°C or ${forecast.mintempF}°F on 
            ${forecast.date}.`;

    return output;
  });
}

exports.callWeatherApi = callWeatherApi;
