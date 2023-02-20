const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');

const protocol = config.server.protocol;
const host = config.server.host;
const port = config.server.port;

const app = express();


// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.get('/ping', (req, res) => {
  return server.sendOk(res, 'pong');
});

// all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

// check admin
app.post('*', routes);


app.listen(port, () => {
  console.log(`Admin Server listening on ${protocol}://${host}:${port}`);
});

module.exports = app;
