import React, { Suspense } from "react";
import { render } from "react-dom";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import axios from 'axios'

const LoggedInRouter = React.lazy(() => import('../routes/LoggedInRouter'));
const PublicRouter = React.lazy(() => import('../routes/PublicRouter'));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('http://localhost:3000/api/v1/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data) {
          this.handleLogin(response.data)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => this.handleLogout())
  }

  handleLogin = (user) => {
    this.setState({
      isLoggedIn: true,
      user:       user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user:       {}
    })
  }

  signOut = (history) => {
    axios.delete('http://localhost:3000/api/v1/signout', {withCredentials: true})
      .then(response => {
        this.handleLogout()
        history.push('/')
      })
      .catch(error => console.log(error))
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <>
        <div className="container">
          <Suspense fallback={<div className="alert alert-info">Loading...</div>}>
            {
              isLoggedIn ?
                <LoggedInRouter user={this.state.user} signOut={this.signOut} history={this.props.history} /> :
                <PublicRouter handleLogin={this.handleLogin} loggedInStatus={isLoggedIn} />
            }
          </Suspense>
        </div>
      </>
    );
  }
}

export default App;
