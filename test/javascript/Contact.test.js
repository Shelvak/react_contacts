import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils"

import Contact from "Contact"
import { fakeContact } from "./TestHelpers";

let container = null;

const historyMock = { push: jest.fn() };

const mockContactFetchAndRender = async (data = {}) => {
  const path    = data.path || '/contacts/:id'
  const contact = {
    id:         data.id         || fakeContact.id,
    first_name: data.first_name || fakeContact.first_name,
    last_name:  data.last_name  || fakeContact.last_name,
    email:      data.email      || fakeContact.email,
    phone:      data.phone      || fakeContact.phone
  };

  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => contact
  }));

  await act(
    async () => {
      render(
        <Router>
          <Contact match={{path: path, params: { id: fakeContact.id }}} history={historyMock}/>
        </Router>
        ,
        container
      )
    }
  );
};

describe('Contact', () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  })

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    global.fetch.mockRestore();
  })

  it('Render', async () => {
    await mockContactFetchAndRender()

    expect(container.querySelector('h1').textContent).toContain('Bond, Test');
    expect(container.textContent).toContain('11223344');
    expect(container.textContent).toContain('test@bond.com');
  });

  it('Destroy', async () => {
    document.head.innerHTML += '<meta name="csrf-token">random-token</meta>';
    await mockContactFetchAndRender({path: '/contacts/1/destroy'})

    // Empty content for destroy action
    expect(container.textContent).toBe('');
    expect(historyMock.push.mock.calls.length).toBe(1)
    expect(historyMock.push.mock.calls[0][0]).toBe('/contacts')
  });
});
