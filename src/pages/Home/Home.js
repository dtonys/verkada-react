import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Home.scss';


let HomePage = () => {
  return (
    <div className={styles.home} > HomePage </div>
  );
};

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  HomePage = hot(module)(HomePage);
}
export default HomePage;
