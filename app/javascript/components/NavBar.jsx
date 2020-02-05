import React from "react";
import { Link } from "react-router-dom";
import { SignOutLink } from "./CustomElements";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">React Contacts</Link>
          <button className="navbar-toggler" type="button" >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="main-navbar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/contacts">Contacts</Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <span className="text-white">
                  {this.props.user.username}
                </span>
              </li>
              &nbsp;&nbsp;
              <li className="nav-item active">
                <SignOutLink signOut={this.props.signOut} history={this.props.history} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
