// can i just add a route that calls  babel on frontend code

const reload = require('reload');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const session = require('express-session');

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(express.static('public'));
const statusCode = 201;


const physicians = [
  {
    id: 0,
    name: 'Hibbert, Juliuss',
  },
  {
    id: 1,
    name: 'Krieger, Algernop',
  },
  {
    id: 2,
    name: 'Riviera, Nickola',
  },
];
const patients = [
  { name: 'fred', docId: '2', time: 4 },
  { name: 'theresa', docId: '0', time: 1 },
  { name: 'pig', docId: '2', time: 2 },
  { name: 'brando', docId: '1', time: 7 },
  { name: 'alice', docId: '0', time: 9 },
  { name: 'ronald', docId: '2', time: 1 },
  { name: 'ken', docId: '1', time: 12 },
];

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.get('/phys', (req, res) => {
  res.writeHead(statusCode);
  res.end(JSON.stringify(physicians));
});

app.get('/patients/:uid', (req, res) => {
  res.writeHead(statusCode);
  res.end(JSON.stringify(
    patients.filter((p) => p.docId === req.params.uid),
  ));
});

app.get('/reload/reload.js', (req, res) => {
  res.sendFile('/Users/jacquesmetevier/lint/reactFullStackMostBasic/node_modules/reload/lib/reload.js');
});

app.get('/*', (req, res) => {
  res.sendFile('/Users/jacquesmetevier/lint/reactFullStackMostBasic/public/index.html');
});
const server = http.createServer(app);

reload(app).then(() => {
  server.listen(app.get('port'), () => {
    console.log(`Web server listening on port ${app.get('port')}`);
  });
}).catch((err) => {
  console.error('Reload could not start, could not start server/sample app', err);
});
