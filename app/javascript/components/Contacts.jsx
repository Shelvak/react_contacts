import React from "react";
import { Link } from "react-router-dom";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/contacts";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ contacts: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { contacts } = this.state;
    const allContacts  = (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone</th>
            <th colSpan="3"></th>
          </tr>
        </thead>
        <tbody>
          {
            contacts.map((contact, index) => (
              <tr key={index}>
                 <td>{ contact.first_name }</td>
                 <td>{ contact.last_name }</td>
                 <td>{ contact.email }</td>
                 <td>{ contact.phone }</td>
                 <td>
                   <Link to={`/contacts/${contact.id}`} className="btn custom-button">s</Link>
                 </td>
                 <td>
                   <Link to={`/contacts/${contact.id}/edit`} className="btn custom-button">e</Link>
                 </td>
                 <td><Link to={`/contacts/${contact.id}`} className="btn custom-button">x</Link></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
    const noContact = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No contacts yet.
        </h4>
      </div>
    );

    return (
      <>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/contacts/new" className="btn custom-button">
                Create New Contact
              </Link>
            </div>
            <div className="row">
              {contacts.length > 0 ? allContacts : noContact}
            </div>
          </main>
        </div>
      </>
    );
  }
}
export default Contacts;
