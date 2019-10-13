class App extends React.Component {
  componentDidMount() {
    fetch('http://127.0.0.1:8000/phys').then(res => {
      res.json().then(data => this.setState({ docs: data }))
    })
  }
  docClick(id) {
    const docs = this.state.docs.slice().map(doc => {
      doc.selected = doc.id === id ? true : false;
      return doc
    })

    fetch('http://127.0.0.1:8000/patients/' + id).then(res => {
      res.json().then(data => this.setState({ patients: data, docs }))
    })
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="App">
            <div className="left">
              {this.state && this.state.docs && this.state.docs.map(doc => (
                <div key={doc.id} className={doc.selected ? 'selected' : ''}>
                  <button onClick={() => this.docClick(doc.id)}>{doc.name}</button>
                </div>
              ))}
            </div>
            <div className="right">
              {this.state && this.state.patients ?
                <Appointments appts={this.state.patients} /> : 'Please click a doctor to see their appointments (and resize the screen to see mobile behavior'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const Appointments = ({ appts }) => {
  return (
    <table>
      <tr>
        <th>Patients</th>
        <th>Time</th>
        <th>Kind</th>
      </tr>
      {appts.sort((a, b) => a - b).map(appt => (
        <tr key={appt.name}>
          <td>
            {appt.name}
          </td>
          <td>
            {appt.time}:00PM
            </td>
          <td>
            {appt.time % 2 === 0 ? 'New Patient' : "Follow-up"}
          </td>
        </tr>
      ))}
    </table>
  )
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
