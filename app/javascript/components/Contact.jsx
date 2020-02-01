import React from "react";
import { Link } from "react-router-dom";

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id:         '',
      first_name: '',
      last_name:  '',
      email:      '',
      phone:      ''
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/contacts/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState(response))
      .catch((e) => {
        debugger
        this.props.history.push("/contacts")
      });
  }

  render() {
    const contact = this.state;

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative ">
            {contact.first_name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger">
                Delete Contact
              </button>
            </div>
          </div>
          <Link to="/contacts" className="btn btn-link">
            Back to contacts
          </Link>
        </div>
      </div>
    );
  }
}
export default Contact;
