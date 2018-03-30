import React from 'react';
import { render } from 'react-dom';
import Question from './Question';

import './style.scss';

import reactIcon from './assets/images/logo.png';

class App extends React.Component {
  render() {
    return (
      <div className='wrapper'>
        <Question />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));