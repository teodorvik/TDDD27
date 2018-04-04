import React, { Component } from 'react';
import { render } from 'react-dom';
import Question from './Question';

import './style.scss';

export default class App extends Component {
  render() {
    return (
      <div>
        <header>Wyrv -Would you rather visualized</header>
        <Question />
        <div className='d3js-canvas'>
          <h1>d3js</h1>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));