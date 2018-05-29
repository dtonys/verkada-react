import { mount } from 'enzyme';
import React from 'react';
import { wrapWithReduxProvider } from './helpers';
import Demo from '../pages/Demo/Demo';
import { AllHtmlEntities } from 'html-entities';
const entities = new AllHtmlEntities();


describe('Demo Page', () => {

  test('Should mount and render', async () => {
    const demo = mount( wrapWithReduxProvider(<Demo />) );
    // console.log(demo.debug());
    expect(demo).toEqual(expect.anything());
  });

  test('Should contain a counter initialized at 0', () => {
    const demo = mount( wrapWithReduxProvider(<Demo />) );
    const count = demo.find('h3[data-test="count"]');
    expect(count).toHaveText('0');
  });

  test('On clicking increment, should show the updated value', () => {
    const demo = mount( wrapWithReduxProvider(<Demo />) );
    expect(demo.find('h3[data-test="count"]')).toHaveText('0');
    const incBtn = demo.find('Button[data-test="increment"]');
    incBtn.simulate('click');
    // demo.update();
    expect(demo.find('h3[data-test="count"]')).toHaveText('1');
  });

  test('On clicking decrement, should show the updated value', () => {
    const demo = mount( wrapWithReduxProvider(<Demo />) );
    expect(demo.find('h3[data-test="count"]')).toHaveText('0');
    const decBtn = demo.find('Button[data-test="decrement"]');
    decBtn.simulate('click');
    expect(demo.find('h3[data-test="count"]')).toHaveText('-1');
  });

  test('On clicking increment async, should show the updated value', ( done ) => {
    jest.useFakeTimers();
    const demo = mount( wrapWithReduxProvider(<Demo />) );
    expect(demo.find('h3[data-test="count"]')).toHaveText('0');
    const incAsyncBtn = demo.find('Button[data-test="incrementAsync"]');
    incAsyncBtn.simulate('click');
    jest.runAllTimers();
    jest.useRealTimers();

    // Need async delay here -> wait for react / redux to finish rendering
    setTimeout(() => {
      expect(demo.find('h3[data-test="count"]')).toHaveText('1');
      done();
    }, 10);
  });

  test('On clicking decrement async, should show the updated value', ( done ) => {
    jest.useFakeTimers();
    const demo = mount( wrapWithReduxProvider(<Demo />) );
    expect(demo.find('h3[data-test="count"]')).toHaveText('0');
    const decAsyncBtn = demo.find('Button[data-test="decrementAsync"]');
    decAsyncBtn.simulate('click');
    jest.runAllTimers();
    jest.useRealTimers();

    setTimeout(() => {
      expect(demo.find('h3[data-test="count"]')).toHaveText('-1');
      done();
    }, 10);
  });

  test('On clicking load data via setState, should load and show data', ( done ) => {
    const mockData = [ { foo: 'bar' } ];
    const successResponse = [
      JSON.stringify(mockData ),
      { status: 200 },
    ];
    fetch.mockResponseOnce(...successResponse);

    const demo = mount( wrapWithReduxProvider(<Demo />) );
    const setStateBtn = demo.find('Button[data-test="loadDataViaSetStateBtn"]');
    setStateBtn.simulate('click');

    setTimeout(() => {
      demo.update();
      const setStateData = JSON.parse(demo.find('[data-test="setStateData"]').text());
      expect(setStateData).toEqual(mockData);
      done();
    }, 10);
  });

  test('On clicking load data via redux, should load and show data', ( done ) => {
    const mockData = [ { foo: 'bar' } ];
    const successResponse = [
      JSON.stringify(mockData ),
      { status: 200 },
    ];
    fetch.mockResponseOnce(...successResponse);

    const demo = mount( wrapWithReduxProvider(<Demo />) );
    const reduxBtn = demo.find('Button[data-test="loadDataViaReduxBtn"]');
    reduxBtn.simulate('click');

    setTimeout(() => {
      demo.update();
      const reduxData = JSON.parse(demo.find('[data-test="reduxData"]').text());
      expect(reduxData).toEqual(mockData);
      done();
    }, 10);
  });

});
