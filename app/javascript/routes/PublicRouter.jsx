import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Signin from '../components/session/Signin'
import Signup from '../components/session/Signup'


class PublicRouter extends React.Component {
  render() {
    const appProps = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            path='/signup' exact
            render={props => ( <Signup {...props} {...appProps} />)} />
          <Route
            path='/*'
            render={props => ( <Signin {...props} {...appProps}/>)} />
        </Switch>
      </BrowserRouter>
    );
  }
};

export default PublicRouter;
