/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
exports.dialogflow = function dialogflow(req, res) {
  const response = 'This is a sample response from your webhook!';

  res.setHeader('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      speech: response,
      displayText: response
    })
  );
};
