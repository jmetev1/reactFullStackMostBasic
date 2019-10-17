import { React, ReactDOM } from 'https://unpkg.com/es-react';
const url = 'http://localhost:8000/';
export default class App extends React.Component {
  componentDidMount() {
    fetch(`${url}phys`).then(res => {
      res.json().then(data => this.setState({
        docs: data
      }, this.docClick.bind(this, 1)));
    });
  }

  docClick(id) {
    const {
      docs
    } = this.state;
    fetch(`${url}patients/${id}`).then(res => {
      res.json().then(data => this.setState({
        patients: data,
        docs: docs.map(doc => ({ ...doc,
          selected: doc.id === id
        }))
      }));
    });
  }

  render() {
    const {
      docs,
      patients
    } = this.state || {};
    return React.createElement("div", null, React.createElement("div", {
      className: "wrapper"
    }, React.createElement("div", {
      className: "App"
    }, React.createElement("div", {
      className: "left"
    }, docs && docs.map(doc => React.createElement("div", {
      key: doc.id,
      className: doc.selected ? 'selected' : ''
    }, React.createElement("button", {
      type: "button",
      onClick: this.docClick.bind(this, doc.id)
    }, doc.name)))), React.createElement("div", {
      className: "right"
    }, patients ? React.createElement(Appointments, {
      appts: patients
    }) : 'Please click a doctor to see their appointments (and resize the screen to see mobile behavior'))));
  }

}

const Appointments = ({
  appts
}) => React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, React.createElement("th", null, "Patients"), React.createElement("th", null, "Time"), React.createElement("th", null, "Kinds")), appts.sort((a, b) => a - b).map(appt => React.createElement("tr", {
  key: appt.name
}, React.createElement("td", null, appt.name), React.createElement("td", null, appt.time, ":00PM"), React.createElement("td", null, appt.time % 2 === 0 ? 'New Patient' : 'Follow-up')))));