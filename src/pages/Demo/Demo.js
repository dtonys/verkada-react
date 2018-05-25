import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Demo.scss';
import { extractState as extractDemoState } from 'redux/demo/reducer';
import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC,
} from 'redux/demo/actions';


@connect(
  (globalState) => ({
    count: extractDemoState(globalState).count,
  })
)
class DemoPage extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  increment = () => {
    this.props.dispatch({ type: INCREMENT_COUNTER });
  }

  decrement = () => {
    this.props.dispatch({ type: DECREMENT_COUNTER });
  }

  incrementAsync = () => {
    this.props.dispatch({ type: INCREMENT_COUNTER_ASYNC });
  }

  decrementAsync = () => {
    this.props.dispatch({ type: DECREMENT_COUNTER_ASYNC });
  }

  render() {
    const { count } = this.props;

    return (
      <div className={styles.demo} >
        <div>DemoPage</div>
        <div>{count}</div>
        <button onClick={ this.increment } >
          Increment
        </button>
        <button onClick={ this.decrement } >
          Decrement
        </button>
        <button onClick={ this.incrementAsync } >
          IncrementAsync
        </button>
        <button onClick={ this.decrementAsync } >
          DecrementAsync
        </button>
      </div>
    );
  }
}

export default DemoPage;
