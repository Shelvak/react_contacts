import React from 'react';
import axios from 'axios'
import { LabelWithTextInput } from "../CustomElements";

import { showErrorMsgFor, setStateOnChange, updateErrors } from "../FormHelpers";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username:              '',
      email:                 '',
      password:              '',
      password_confirmation: '',
      errors:                ''
    };

    this.showErrorMsgFor  = showErrorMsgFor.bind(this);
    this.setStateOnChange = setStateOnChange.bind(this);
    this.updateErrors     = updateErrors.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { username, email, password, password_confirmation } = this.state;

    let user = {
      username:              username,
      email:                 email,
      password:              password,
      password_confirmation: password_confirmation
    };

    axios.post('http://localhost:3000/api/v1/users', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.errors) {
          this.setState({
            errors: response.data.errors
          })
        } else {
          this.props.handleLogin(response.data)
          this.props.history.push('/')
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  render() {
    const {username, email, password, password_confirmation} = this.state

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <LabelWithTextInput object="user" attribute="username"
              showError={this.showErrorMsgFor}
              label="Username"
              onChange={this.setStateOnChange}
              value={username} />
          <LabelWithTextInput object="user" attribute="email"
              showError={this.showErrorMsgFor}
              label="Email"
              onChange={this.setStateOnChange}
              value={email} />
          <LabelWithTextInput object="user" attribute="password"
              showError={this.showErrorMsgFor}
              label="Password"
              type="password"
              onChange={this.setStateOnChange}
              value={password} />
          <LabelWithTextInput object="user" attribute="password_confirmation"
              showError={this.showErrorMsgFor}
              label="Password Confirmation"
              type="password"
              onChange={this.setStateOnChange}
              value={password_confirmation} />

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
export default Signup;
