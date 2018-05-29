import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Home.scss';
import { Header } from 'semantic-ui-react';


let HomePage = () => {
  return (
    <div className={styles.home}>
      <Header as="h1" textAlign="center">
        React single page application boilerplate
      </Header>

    </div>
  );
};

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  HomePage = hot(module)(HomePage);
}
export default HomePage;
