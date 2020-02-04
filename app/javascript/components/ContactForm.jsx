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
      status:     'new_record',
      errors:     {}
    }

    this.onChange        = this.onChange.bind(this)
    this.onSubmit        = this.onSubmit.bind(this)
    this.showErrorMsgFor = this.showErrorMsgFor.bind(this)
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateErrors(errors) {
    if (!errors || errors == {}) {
      this.setState({ errors: { base: 'Oops, something wrong' } })
      return
    }

    this.setState({ errors: errors })
  }

  onSubmit(event) {
    event.preventDefault();

    let url    = "/api/v1/contacts";
    let method = "POST";

    const {id, ...contact} = this.state;
    const token = document.querySelector('meta[name="csrf-token"]').content;

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
      .then(response => response.json())
      .then(response => {
        if (response.errors)
          this.updateErrors(response.errors);
        else
          this.props.history.push(`/contacts/${response.id}`);
      })
      .catch(error => this.updateErrors());
  }

  async fetchContact(id) {
    const url = `/api/v1/contacts/${id}`;

    try {
      const response = await fetch(url);

      return await response.json();
    } catch (e) {
      this.setState({ status: 'error' })
    }
  }

  componentDidMount() {
    let {
      match: {
        params: { id }
      }
    } = this.props

    if (!id)
      return

    const contact = this.fetchContact(id)

    if (contact) {
      contact.then(response => this.setState({...response, status: 'persited'}))
    }
  }

  showErrorMsgFor(attr) {
    const errors = this.state.errors;

    if (!errors[attr])
      return

    return (
      <span className="text-danger">
        { errors[attr] }
      </span>
    )
  }

  render() {
    const contact  = this.state;
    const errorDiv = (
      <div className="alert alert-danger">
        Oops, something wrong. Please try later.
      </div>
    )

    if (contact.status === 'error') {
      return (
        <div className="container">
          {errorDiv}

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

        {contact.errors.base && errorDiv}

        <form onSubmit={this.onSubmit}>
          <div className="form-inputs">
            <LabelWithTextInput object="contact" attribute="first_name"
              showError={this.showErrorMsgFor}
              label="First Name" onChange={this.onChange}
              value={contact.first_name} />

            <LabelWithTextInput object="contact" attribute="last_name"
              showError={this.showErrorMsgFor}
              label="Last Name" onChange={this.onChange}
              value={contact.last_name} />

            <LabelWithTextInput object="contact" attribute="email"
              showError={this.showErrorMsgFor}
              label="Email" onChange={this.onChange}
              value={contact.email} />

            <LabelWithTextInput object="contact" attribute="phone"
              showError={this.showErrorMsgFor}
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
