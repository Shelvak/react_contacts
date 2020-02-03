import React from "react";
import { Link } from "react-router-dom";
import { ShowLink, EditLink, DestroyLink } from "./CustomElements";

import BootstrapPagination from "./BootstrapPagination";

class Contacts extends React.Component {
  constructor(props) {
    super(props);

    const query = new URLSearchParams(this.props.location.search);
    const page  = +query.get('page') || 1

    this.state = {
      contacts:   [],
      pagination: { current: page }
    };
  }

  async fetchContacts() {
    const url = `/api/v1/contacts?page=${this.state.pagination.current}`;

    try {
      const response = await fetch(url);

      return await response.json();
    } catch(e) {
      console.log('error: ' + e)
    }
  }

  updateCollection() {
    const contacts = this.fetchContacts();

    if (contacts)
      contacts.then(response => {
        this.setState({
          contacts:   response.data,
          pagination: response.pagination
        })
      })
  }

  handlePageClick = data => {
    // ReactPaginate request the first page on initialize
    let page = data.selected + 1; //selected is the offset to be multiplied

    this.setState({ pagination: { current: page } }, () => {
      this.updateCollection();

      this.props.history.push(`/contacts?page=${page}`)
    });
  };

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

    const pagination = this.state.pagination;

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

            <BootstrapPagination handlePageClick={this.handlePageClick} {...this.state.pagination} />
          </main>
        </div>
      </>
    );
  }
}

export default Contacts;
