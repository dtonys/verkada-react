import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Demo.scss';
import { extractState as extractDemoState } from 'redux/demo/reducer';
import {
  INCREMENT_COUNTER, DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC, DECREMENT_COUNTER_ASYNC,
  LOAD_DATA_REQUESTED,
} from 'redux/demo/actions';
import {
  Header,
  Grid,
  Button,
} from 'semantic-ui-react';


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
        <Header as="h1" textAlign="center">
          Demo Page
        </Header>
        <Header as="h3" textAlign="center" >
          Counter
        </Header>
        <Header as="h3" textAlign="center" data-test="count">
          {count}
        </Header>
        <br />
        <Grid columns="equal" stackable>
          <Grid.Column textAlign="center">
            <Button onClick={ this.increment } data-test="increment" >
              Increment
            </Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Button onClick={ this.decrement } data-test="decrement" >
              Decrement
            </Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Button onClick={ this.incrementAsync } data-test="incrementAsync" >
              IncrementAsync
            </Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Button onClick={ this.decrementAsync } data-test="decrementAsync" >
              DecrementAsync
            </Button>
          </Grid.Column>
        </Grid>
        <br />
        <br />
        <hr />
        <br />
        <Header as="h3" textAlign="center">
          Load data
        </Header>
        <br />
        <Grid columns="equal">
          <Grid.Column textAlign="center">
            <Button onClick={ this.loadDataViaSetState } data-test="loadDataViaSetStateBtn" >
              Load Data via SetState
            </Button>
            <br /><br />
            { data &&
              <div style={{ textAlign: 'left' }} data-test="setStateData" >
                {JSON.stringify(data, null, 2)}
              </div>
            }
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Button onClick={ this.loadDataViaRedux } data-test="loadDataViaReduxBtn" >
              Load Data via Redux
            </Button>
            <br /><br />
            { reduxData &&
              <div style={{ textAlign: 'left' }} data-test="reduxData" >
                {JSON.stringify(reduxData, null, 2)}
              </div>
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  DemoPage = hot(module)(DemoPage);
}

export default DemoPage;
