import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import InfiniteScrollBigData, {
  INTERVAL_SECONDS_20,
  // INTERVAL_SECONDS_HOUR,
} from 'components/InfiniteScrollBigData/InfiniteScrollBigData';


class HomePage extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <InfiniteScrollBigData
          intervalSeconds={INTERVAL_SECONDS_20}
        />
      </div>
    );
  }
}

export default hot(module)(HomePage);
