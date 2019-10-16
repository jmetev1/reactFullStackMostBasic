const server = 'http://localhost:8000/'
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    const data = await fetch(server + 'new').then((res) => res.json());
    this.setState(data, data.turn === data.name ? this.rando : this.wait)
  }
  rando() {
    let pos, tries = 50;
    while (this.state.board[pos] !== 0 && tries > 0) {
      pos = Math.floor(9 * Math.random()); tries--;
    };
    if (pos === undefined) console.log('stuck')
    else this.go(pos)
  }
  go(pos) {
    console.log('taking turn')
    fetch(server + 'go?turn=' + pos).then(res => res.json()).then(this.wait)
  }
  wait = async () => {
    console.log('made req with', this.state.board);
    const update = await fetch(server + 'update', {
      method: 'POST', body: JSON.stringify(this.state.board),
      headers: { 'Content-Type': 'application/json' },
    }).then(r => r.json()).then(r => console.log('received respon', r));
    this.setState(update, () => {
      const { name, turn, board } = this.state;
      if (turn === name) {
        this.rando();
      }
      else {
        console.log('setting wait again')
        this.wait();
      }
    });
  }

  board() {
    let box = pos => (<button
      onClick={() => this.go(pos)}
      className='box' id={pos}>{this.state.board[pos] || '-'}</button>)
    let row = start => <div className='row'>
      {[0, 0, 0].map((e, i) => box(i + start * 3), '')}
    </div>;
    return ([0, 0, 0].map((e, i) => row(i)))
  }
  render() {
    const { name, turn, } = this.state;
    return (
      <div>
        <div className="wrapper">
          <div className="App">
            <div className="left">
              <h2>u r {name === 'x' ? "AI" : "hooman"}</h2>
              <div>turn {turn === 'o' ? "AI" : "hooman"}</div>
            </div>
            <div className="right">
              {this.state.board ? this.board() : 'loading'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Route = path => {
  switch (path) {
    case '/appointments': return App;
    case '/': return App;
    default: return () => <div>not found</div>
  }
}

const Dest = Route(location.pathname)
ReactDOM.render(
  <Dest />,
  document.getElementById('root'),
);
// let array = new Array(9), turn = 'x';
// const myClick = function (e) {
//   if (!array[e.id]) {
//     array[e.id] = document.getElementById(e.id).innerText = turn;
//     if ([
//       [0, 1, 2], [3, 4, 5], [6, 7, 8],
//       [0, 3, 6], [1, 4, 7], [2, 5, 8],
//       [0, 4, 8], [2, 4, 6]
//     ].some(winner => winner.every(i => array[i] === turn))) alert(`${turn} WINS!`)
//     turn = turn === 'x' ? 'o' : 'x';
//   };
// };
// let box = pos => `<button onclick="myClick(this)" class='box' id=${pos}>-</button>`;
// let three = [0, 0, 0];
// let row = start => `<div class='row'>
//         ${three.reduce((a, c, i) => a + box(i + start * 3), '')}
//     </div>`
// let board = three.reduce((a, c, i) => a + row(i), '')
// document.getElementById('root').innerHTML = board;
