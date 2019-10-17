import { React } from 'https://unpkg.com/es-react';

const url = 'http://localhost:8000/';
export default class App extends React.Component {
  componentDidMount() {
    fetch(`${url}phys`).then((res) => {
      res.json()
        .then((data) => this.setState({ docs: data }, this.docClick.bind(this, 1)));
    });
  }

  docClick(id) {
    const { docs } = this.state;
    fetch(`${url}patients/${id}`).then((res) => {
      res.json().then((data) => this.setState({
        patients: data,
        docs: docs.map((doc) => ({
          ...doc,
          selected: doc.id === id,
        })),
      }));
    });
  }

  render() {
    const { docs, patients } = this.state || {};
    return (
      <div>
        <div className="wrapper">
          <div className="App">
            <div className="left">
              {docs && docs.map((doc) => (
                <div key={doc.id} className={doc.selected ? 'selected' : ''}>
                  <button type="button" onClick={this.docClick.bind(this, doc.id)}>{doc.name}</button>
                </div>
              ))}
            </div>
            <div className="right">
              {patients ? <Appointments appts={patients} /> : 'Please click a doctor to see their appointments (and resize the screen to see mobile behavior'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const Appointments = ({ appts }) => (
  <table>
    <tbody>
      <tr>
        <th>Patients</th>
        <th>Time</th>
        <th>Kinds</th>
      </tr>
      {appts.sort((a, b) => a - b).map((appt) => (
        <tr key={appt.name}>
          <td>
            {appt.name}
          </td>
          <td>
            {appt.time}
            :00PM
          </td>
          <td>
            {appt.time % 2 === 0 ? 'New Patient' : 'Follow-up'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
