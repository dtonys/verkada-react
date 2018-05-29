import 'raf/polyfill';
import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

// mock local storage
// https://github.com/tmpvar/jsdom/issues/1137
const inMemoryLocalStorage = {};
window.localStorage = {
  setItem(key, val) {
    inMemoryLocalStorage[key] = val;
  },
  getItem(key) {
    return inMemoryLocalStorage[key];
  },
  removeItem(key) {
    delete inMemoryLocalStorage[key];
  },
};

// mock fetch API
global.fetch = require('jest-fetch-mock');
global.realSetTimeout = setTimeout;
