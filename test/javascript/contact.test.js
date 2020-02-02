import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils"
import Contact from "Contact"
import App from 'App'
// import { shallow, mount, render } from 'enzyme';

// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(() => {
  // limpieza al salir
  // unmountComponentAtNode(container);
  // container.remove();
  // container = null;
})


it('Render Contact', async () => {
  const fakeContact = {
    id:         '1',
    first_name: 'Test',
    last_name:  'Bond',
    email:      'test@bond.com',
    phone:      '11223344'
  };

  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(fakeContact)
    })
  );

  await act(async () => {
    render((
        <App>
          <Contact match={{path: '/contacts/:id', params: { id: 1 }}}/>
        </App>),
      container
    )
  });

  // debugger
  expect(container.textContent).toContain('tanga');
});
