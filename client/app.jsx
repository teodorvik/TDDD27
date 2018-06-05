import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Nav, NavLink, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AnswerQuestion from './views/question/containers/AnswerQuestion';
import CreateQuestion from './views/question/containers/CreateQuestion';
import QuestionListing from './views/question/containers/QuestionListing';
import Login from './views/login/containers/Login';

import './style.scss';

import rootReducers from './rootReducers';
const store = createStore(rootReducers, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
                <header>
                    <div className='title'>
                      <Link to='/'>
                        <h1>WYRV</h1>
                          <p>// "Would you rather" visualized</p>
                      </Link>
                    </div>
                  <div className='tabs'>
                    <NavLink exact to='/' activeClassName='is-active'>Answer</NavLink>
                    <NavLink to='/view' activeClassName='is-active'>View</NavLink>
                    <NavLink to='/add' activeClassName='is-active'>Add</NavLink>
                    <Login />
                  </div>
                </header>
              <Switch>
                <Route exact path='/view' component={QuestionListing}/>
                <Route exact path='/add' component={CreateQuestion}/>
                <Route component={AnswerQuestion} />
              </Switch>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));