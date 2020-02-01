import React from "react";
import { Link } from "react-router-dom";
import { LabelWithTextInput } from "./CustomElements";

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id:         '',
      first_name: '',
      last_name:  '',
      email:      '',
      phone:      '',
      status:     'new_record'
    }

    this.onChange  = this.onChange.bind(this)
    this.onSubmit  = this.onSubmit.bind(this)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()

    let url    = "/api/v1/contacts"
    let method = "POST"

    const {id, ...contact} = this.state
    const token = document.querySelector('meta[name="csrf-token"]').content

    // update action
    if (id) {
      url   += `/${id}`
      method = 'PUT'
    }

    fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contact)
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => this.props.history.push(`/contacts/${response.id}`))
      .catch(error => console.log(error.message))
  }

  componentDidMount() {
    let {
      match: {
        params: { id }
      }
    } = this.props

    if (!id)
      return

    const url = `/api/v1/contacts/${id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({...response, status: 'persited'}))
      .catch(() => this.setState({ status: 'error' }))
  }

  render() {
    let contact = this.state
    console.log('tu vieja: ' + contact.status)

    if (contact.status === 'error') {
      return (
        <div className="container">
          <div className="alert alert-danger">
            Oops, something wrong. Please try later.
          </div>

          <Link to="/contacts" className="btn btn-link mt-3">
            Back
          </Link>
        </div>
      )
    }

    return (
      <div className="container">
        <h2>
          {contact.id ? `Updating ${contact.last_name} ${contact.first_name}` : 'Creating new contact' }
        </h2>

        <form onSubmit={this.onSubmit}>
          <div className="form-inputs">
            <LabelWithTextInput object="contact" attribute="first_name"
              label="First Name" onChange={this.onChange}
              value={contact.first_name} />

            <LabelWithTextInput object="contact" attribute="last_name"
              label="Last Name" onChange={this.onChange}
              value={contact.last_name} />

            <LabelWithTextInput object="contact" attribute="email"
              label="Email" onChange={this.onChange}
              value={contact.email} />

            <LabelWithTextInput object="contact" attribute="phone"
              label="Phone" onChange={this.onChange}
              value={contact.phone} />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary custom-button mt-3">
              {contact.id ? 'Update' : 'Create' }
            </button>
            <Link to="/contacts" className="btn btn-link mt-3">
              Back
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default ContactForm
