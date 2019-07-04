import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppFetchRenderProp from './AppFetchRenderProp';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

const Main = () => {
  return (
    <AppFetchRenderProp url="https://www.reddit.com/r/Aww.json">
      {state => <pre>{JSON.stringify(state)}</pre>}
    </AppFetchRenderProp>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
