import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";

import ContactForm from "ContactForm";
import { fakeContact } from "./TestHelpers";

let container = null;

const mockContactFetchAndRender = async (data = {}) => {
  const contact = {
    id:         data.id         || fakeContact.id,
    first_name: data.first_name || fakeContact.first_name,
    last_name:  data.last_name  || fakeContact.last_name,
    email:      data.email      || fakeContact.email,
    phone:      data.phone      || fakeContact.phone
  };

  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => fakeContact
  }));

  await act(
    async () => {
      render(
        <Router>
          <ContactForm match={{params: { id: fakeContact.id }}} history={[]}/>
        </Router>
        ,
        container
      )
    }
  );
}

describe('ContactForm', () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;

    if (global.fetch)
      global.fetch.mockRestore();
  });


  it('Render new', async () => {
    act(() => {
      render(
        <Router>
          <ContactForm  match={{ params: {} }} history={[]}/>
        </Router>
        ,
        container
      )
    });

    expect(container.querySelector('h2').textContent).toContain('Creating new contact');

    let {id, ...attributes} = fakeContact;

    for (var attr in attributes) {
      expect(container.querySelector(`#contact_${attr}`)).toBeTruthy();
      expect(container.querySelector(`#contact_${attr}`).value).toBe('');
    }
  });

  it('Render edit', async () => {
    await mockContactFetchAndRender();

    expect(container.querySelector('h2').textContent).toContain(`Updating ${fakeContact.last_name} ${fakeContact.first_name}`);

    let {id, ...attributes} = fakeContact;

    for (var attr in attributes) {
      expect(container.querySelector(`#contact_${attr}`)).toBeTruthy();
      expect(container.querySelector(`#contact_${attr}`).value).toBe(attributes[attr]);
    }
  });
});
