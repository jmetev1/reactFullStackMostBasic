import { React, ReactDOM } from 'https://unpkg.com/es-react';

const Fail = () => <div>other</div>;
const Route = {
  '/': React.lazy(() => import('./App.js')),
  '*': Fail
};

const Current = Route[location.pathname] || Route['*'];
console.log(Current, location.pathname);
ReactDOM.render(
  <React.Suspense fallback={<div>joooooooooo</div>}>
    <Current />
  </React.Suspense>, document.getElementById('root'),
);
