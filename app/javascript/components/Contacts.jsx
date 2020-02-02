import React from "react";
import { Link } from "react-router-dom";
import { ShowLink, EditLink, DestroyLink } from "./CustomElements";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    };
  }

  async fetchContacts() {
    const url = "/api/v1/contacts";

    try {
      const response = await fetch(url);

      return await response.json();
    } catch(e) {
      console.log('error: ' + e)
    }
  }

  componentDidMount() {
    const contacts = this.fetchContacts();

    if (contacts)
      contacts.then(response => this.setState({ contacts: response }))
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
                   <ShowLink href={`/contacts/${contact.id}`} />
                 </td>
                 <td>
                   <EditLink href={`/contacts/${contact.id}/edit`} />
                 </td>
                 <td>
                   <DestroyLink href={`/contacts/${contact.id}/destroy`} />
                 </td>
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
              <Link to="/contacts/new" className="btn btn-primary new-contact">
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
