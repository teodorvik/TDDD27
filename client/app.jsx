import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Question from './views/question/containers/AnswerQuestion';
import CreateQuestion from './views/question/containers/CreateQuestion';

import './style.scss';

import rootReducers from './rootReducers';
const store = createStore(rootReducers, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            <header>Wyrv - Would you rather visualized</header>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' render={() => (
                  <React.Fragment>
                    {/* <Filter /> */}
                    <CreateQuestion />
                    <Question />
                    <div className='d3js-canvas'>
                      <h1>d3js</h1>
                    </div>
                  </React.Fragment>
                )} />
                <Route exact path='/profile' render={() => <h1>Profile</h1>} />
              </Switch>
            </BrowserRouter>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));