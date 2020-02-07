// Using the Twit node package
// https://github.com/ttezel/twit
const Twit = require('twit');
const express = require('express');

// Pulling all my twitter account info from environment variables
const config = {
  consumer_key:         'y5OnzAoke8dl3RqaRVJH7rRfh',
  consumer_secret:      'wtniLIE6BCtiCiy1KX30inDtngI2e08kUgmjD3pW59IOJShDxz',
  access_token:         '1225237271550447617-14PQ5C4PKZi77ctvCDGxADM4BpwwQ3',
  access_token_secret:  '6GFQC0Kcgxq4hkKQmT5HNMoGiit4L3EpUo7IsLUROFLjx'
};

const app = express();
const port = 5000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Making a Twit object for connection to the API
const T = new Twit(config);

app.get('/search', (request, res) => {
  T.get('search/tweets', { q: request.query.q, count: 100 }, function(err, data, response) {
    res.status(200).send({
      success: 'true',
      data: data
    })
  })
});

app.get('/suggestions', (request, res) => {
  T.get('users/search', { q: request.query.q }, function(err, data, response) {
    res.status(200).send({
      success: 'true',
      data: data
    })
  })
});