import { React, ReactDOM } from 'https://unpkg.com/es-react';

const Fail = () => React.createElement("div", null, "other");

const Route = {
  '/': React.lazy(() => import('./App.js')),
  '*': Fail
}; // const Current = Route[location.pathname || Route['*']];

const Current = Route[location.pathname] || Route['*'];
ReactDOM.render(React.createElement(React.Suspense, {
  fallback: React.createElement("div", null, "joooooooooo")
}, React.createElement(Current, null)), document.getElementById('root')); // ReactDOM.render(
//   html`
//     <${React.Suspense} fallback=${html`<div></div>`}>
//       <${Route[location.pathname] || Route['*']} />
//     <//>
//   `,
//   document.body,
// );