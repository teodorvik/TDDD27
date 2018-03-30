import React from 'react';
import { render } from 'react-dom';

import './style.scss';

import reactIcon from './assets/images/logo.png';

class App extends React.Component {
  render() {
    return (
      <div>
        <img src={reactIcon} />
        <h1>Hello React!</h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));