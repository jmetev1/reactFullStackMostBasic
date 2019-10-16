const reload = require('reload')
const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const session = require('express-session');
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

app.set('port', process.env.PORT || 8000)
app.use(bodyParser.json())
const state = { board: new Array(9).fill(0), turn: 'x' }
app.use(express.static('public'))

const users = new Set();
app.get('/new', function (req, res) {
  const sess = req.session;
  sess.name = sess.name || users.size ? 'x' : 'o';
  sess.type = sess.name === 'x' ? "ai" : "hooman";
  users.add(sess.name)
  res.writeHead(statusCode);
  res.end(JSON.stringify({ name: sess.name, ...state }));
})
const holding = { responses: [] }; // this hash is state of the board, if request for update comes in and current hash is same
app.post('/update', function (req, res) {
  console.log(req.session.type, 'requested update');
  res.type = req.session.type;
  holding.responses.push(res);
  console.log('board on server', state.board, req.body)
  const [clientState, serverBoard] = [req.body, state.board].map(b => JSON.stringify(b))
  if (clientState !== serverBoard) {
    holding.responses.forEach(res => {
      console.log('update sent to', res.type, 'with this', state)
      res.end(JSON.stringify(state))
    })
    holding.responses = [];
  } else console.log('not sent')
})

app.get('/go', function (req, res) {
  state.board[parseInt(req.query.turn)] = req.session.name;
  state.turn = req.session.name === 'x' ? 'o' : 'x'
  console.log(req.session.type, 'went, now  '
    , state.board
  )
  res.writeHead(statusCode);
  res.end(JSON.stringify(''));
})
const statusCode = 201;
const server = http.createServer(app)

reload(app).then(function (reloadReturned) {
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})

// if ([
//   [0, 1, 2], [3, 4, 5], [6, 7, 8],
//   [0, 3, 6], [1, 4, 7], [2, 5, 8],
//   [0, 4, 8], [2, 4, 6]
// ].some(winner => winner.every(i => array[i] === turn))) alert(`${turn} WINS!`)
// const gameOver = () => {
//   if (state.board.every(s => s)) 
// }