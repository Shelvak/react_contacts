import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AppConfig from "../AppConfig";
import { LabelWithTextInput } from "../CustomElements";
import { showErrorMsgFor, setStateOnChange, updateErrors } from "../FormHelpers";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors:   ''
    };

    this.showErrorMsgFor  = showErrorMsgFor.bind(this);
    this.setStateOnChange = setStateOnChange.bind(this);
    this.updateErrors     = updateErrors.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let user = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post(`${AppConfig.serverUrl}/api/v1/signin`, {user}, {withCredentials: true})
      .then(response => {
        if (response.data.errors) {
          this.updateErrors({base: response.data.errors})
        } else {
          this.props.handleLogin(response.data)
          this.props.history.push('/')
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  render() {
    const { base } = this.state.errors;

    return (
      <div>
        <h1>Log In</h1>
        { base ? <div className="alert alert-danger">{base}</div> : '' }
        <form onSubmit={this.handleSubmit}>
          <LabelWithTextInput object="user" attribute="username"
            label="Username"
            onChange={this.setStateOnChange} />
          <LabelWithTextInput object="user" attribute="password"
            label="Password" type="password"
            onChange={this.setStateOnChange} />

          <button type="submit" className="btn btn-primary">
            Log In
          </button>

          <div>
            or <Link to='/signup'>sign up</Link>
          </div>

        </form>
      </div>
    );
  }
}
export default Signin;
