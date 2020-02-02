import React from "react";
import { Link } from "react-router-dom";
import { DeleteButton } from "./CustomElements";

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

    const path = this.props.match && this.props.match.path || '';

    // Destroy action
    if (/destroy$/.test(path))
      this.destroy()

    this.destroy = this.destroy.bind(this)
  }

  async fetchContact(id) {
    try {
      const response = await fetch(`/api/v1/contacts/${id}`);

      return await response.json();
    } catch(e) {
      console.log('error: ' + e)
      this.props.history.push("/contacts")
    };

  }

  componentDidMount() {
    console.log('Tu re vieja')
    const {
      match: {
        path,
        params: { id }
      }
    } = this.props;

    // Destroy action
    if (/destroy$/.test(path))
      return;

    const contact = this.fetchContact(id);

    if (contact)
      contact.then(response => this.setState(response));
  }

  destroy() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/contacts/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/contacts"))
      .catch(error => console.log(error.message));
  }

  render() {
    const contact = this.state;

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative ">
            {contact.last_name}, {contact.first_name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Email:</strong>
                  {contact.email}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Phone:</strong>
                  {contact.phone}
                </li>
              </ul>
            </div>
          </div>
          <hr />

          <Link to="/contacts" className="btn btn-link">
            Back
          </Link> | &nbsp;
          <DeleteButton destroyFn={this.destroy} />
        </div>
      </div>
    );
  }
}
export default Contact;
