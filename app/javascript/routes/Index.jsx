import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contacts from "../components/Contacts";
import Contact from "../components/Contact";
import ContactForm from "../components/ContactForm";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Contacts} />
      <Route path="/contacts/new" exact component={ContactForm} />
      <Route path="/contacts" exact component={Contacts} />
      <Route path="/contacts/:id/edit" exact component={ContactForm} />
      <Route path="/contacts/:id" exact component={Contact} />
    </Switch>
  </Router>
);
