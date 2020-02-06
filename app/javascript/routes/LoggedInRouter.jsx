import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Contacts from "../components/Contacts";
import Contact from "../components/Contact";
import ContactForm from "../components/ContactForm";
import NavBar from '../components/NavBar'

class LoggedInRouter extends React.Component {
  history = createBrowserHistory(this.props);

  render()  {
    debugger
    return (
      <Router history={this.history}>
        <NavBar {...this.props} history={this.history} />

        <Switch>
          <Route path="/contacts/new" exact component={ContactForm} />
          <Route path="/contacts/:id/edit" exact component={ContactForm} />
          <Route path="/contacts/:id/destroy" exact component={Contact} />
          <Route path="/contacts/:id" exact component={Contact} />
          <Route path="/contacts" exact component={Contacts} />
          <Route path="*" component={Contacts} />
        </Switch>
      </Router>
    );
  }
};

export default LoggedInRouter;
