import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils"

import Contacts from "Contacts"
import { fakeContact } from "./TestHelpers"

let container = null;

const mockContactsFetchAndRender = async (data = {}) => {
  const contacts = [...Array(data.count)].map(() => {
    return fakeContact;
  });

  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => {
      return { data: contacts, pagination: {} };
    }
  }));

  await act(
    async () => {
      render(
        <Router>
          <Contacts history={[]}/>
        </Router>
        ,
        container
      )
    }
  );
};

describe('Contacts', () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  })

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;

    if (global.fetch)
      global.fetch.mockRestore();
  })

  it('Render 1 contact', async () => {
    await mockContactsFetchAndRender({count: 1});

    expect(container.querySelector('.new-contact').textContent).toContain('Create New Contact');

    let rows = container.querySelectorAll('table tbody tr');
    expect(rows.length).toBe(1);

    let tds = rows[0].querySelectorAll('td');
    expect(tds[0].textContent).toContain(fakeContact.first_name);
    expect(tds[1].textContent).toContain(fakeContact.last_name);
    expect(tds[2].textContent).toContain(fakeContact.email);
    expect(tds[3].textContent).toContain(fakeContact.phone);
  });

  it('Render no contacts', async () => {
    await mockContactsFetchAndRender({ count: 0 });

    expect(container.querySelector('.new-contact').textContent).toContain('Create New Contact');

    expect(container.textContent).toContain('No contacts');
  });
});
