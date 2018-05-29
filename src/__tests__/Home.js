import { mount } from 'enzyme';
import React from 'react';
import { wrapWithReduxProvider } from './helpers';
import Home from '../pages/Home/Home';


describe('Home Page', () => {

  test('Should mount and render', async () => {
    const home = mount( wrapWithReduxProvider(<Home />) );
    // console.log(home.debug());
    expect(home).toEqual(expect.anything());
  });

  test('Should contain an h1 with some text', () => {
    const home = mount( wrapWithReduxProvider(<Home />) );
    const h1 = home.find('h1');
    expect(h1).toIncludeText('React single page application boilerplate');
  });
});
