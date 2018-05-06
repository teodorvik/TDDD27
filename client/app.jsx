import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AnswerQuestion from './views/question/containers/AnswerQuestion';
import CreateQuestion from './views/question/containers/CreateQuestion';
import QuestionListing from './views/question/containers/QuestionListing';
import MainTabs from './views/navigation/containers/MainTabs';
import MainPanels from './views/navigation/containers/MainPanels';
import { Tab } from './views/navigation/components/Tabs';

import './style.scss';

import rootReducers from './rootReducers';
const store = createStore(rootReducers, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
              <header>
              <div className='title'>
                <h1>WYRV</h1>
                <p>// "Would you rather" visualized</p>
              </div>
              <MainTabs>
                <Tab>Answer</Tab>
                <Tab>View</Tab>
                <Tab>Add</Tab>
              </MainTabs>
              </header>
            <MainPanels>
              <AnswerQuestion />
              <QuestionListing />
              <CreateQuestion />
            </MainPanels>
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));