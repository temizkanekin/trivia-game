import React, { Component } from 'react';
import WelcomeView from './components/welcome-view/welcome-view'
import QuestionsView from './components/questions-view/questions-view'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';

class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
         <Redirect from="/" to="welcome" exact/>
          {/* <Route path="/" component={WelcomeView} /> */}
          <Route path="/welcome" component={WelcomeView} exact />
          <Route path="/category/:category/difficulty/:difficulty" component={QuestionsView} exact />
          <Route path="/random" component={QuestionsView} exact />
        </Switch>
      </Router>
    )
  }
}

export default App;
