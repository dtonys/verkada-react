import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './NotFound.scss';


let NotFoundPage = () => {
  return (
    <div className={styles.notFound} > NotFound </div>
  );
};

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  NotFoundPage = hot(module)(NotFoundPage);
}
export default NotFoundPage;
