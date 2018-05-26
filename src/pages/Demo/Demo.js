import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetch from 'unfetch';

import styles from './Demo.scss';
import { extractState as extractDemoState } from 'redux/demo/reducer';
import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC,
  LOAD_DATA_REQUESTED,
} from 'redux/demo/actions';


@connect(
  (globalState) => ({
    count: extractDemoState(globalState).count,
    reduxData: extractDemoState(globalState).data,
  })
)
class DemoPage extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    reduxData: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  }
  static defaultProps = {
    reduxData: null,
  }

  constructor( props ) {
    super(props);
    this.state = {
      data: null,
    };
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

  loadDataViaSetState = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();
    this.setState({
      data: data,
    });
  }

  loadDataViaRedux = () => {
    this.props.dispatch({ type: LOAD_DATA_REQUESTED });
  }

  render() {
    const { count, reduxData } = this.props;
    const { data } = this.state;

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
        <hr />
        <button onClick={ this.loadDataViaSetState } >
          Load Data via SetState
        </button>
        { data && <div> {JSON.stringify(data)} </div> }
        <button onClick={ this.loadDataViaRedux } >
          Load Data via Redux
        </button>
        { reduxData && <div> {JSON.stringify(reduxData)} </div> }
      </div>
    );
  }
}

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  DemoPage = hot(module)(DemoPage);
}

export default DemoPage;
