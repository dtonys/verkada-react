import React from 'react';
import { compose } from 'redux';
import { hot } from 'react-hot-loader';

import styles from './Home.scss';
import { Header } from 'semantic-ui-react';


const HomePage = () => {
  return (
    <div className={styles.home}>
      <Header as="h1" textAlign="center">
        React single page application boilerplate
      </Header>
    </div>
  );
};

export default compose(
  hot(module),
)(HomePage);
