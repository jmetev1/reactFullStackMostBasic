var http = require('http')
var bodyParser = require('body-parser')
var app = require('express')()

var physicians = [
  {
    id: 0,
    name: "Hibbert, Juliuss"
  },
  {
    id: 1,
    name: "Krieger, Algernop"
  },
  {
    id: 2,
    name: "Riviera, Nickola"
  }
]
var patients = [
  { name: "fred", docId: 2, time: 4 },
  { name: "theresa", docId: 0, time: 1 },
  { name: "pig", docId: 2, time: 2 },
  { name: "brando", docId: 1, time: 7 },
  { name: "alice", docId: 0, time: 9 },
  { name: "ronald", docId: 2, time: 1 },
  { name: "ken", docId: 1, time: 12 },
]
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
app.set('port', process.env.PORT || 8000)
app.use(bodyParser.json())

app.get('/phys', function (req, res) {
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(physicians));
})
const getPatients = docId => patients.filter(p => p.docId === docId)
app.get('/patients/0', function (req, res) {
  let patients = getPatients(0)
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(patients));
})
app.get('/patients/1', function (req, res) {
  let patients = getPatients(1)
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(patients));
})
app.get('/patients/2', function (req, res) {
  let patients = getPatients(2)
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(patients));
})
var statusCode = 201;

var server = http.createServer(app)

server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
})
