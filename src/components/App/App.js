import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './App.scss';
import Link from 'redux-first-router-link';
import { NOT_FOUND } from 'redux-first-router';
import { hot } from 'react-hot-loader';

import { ROUTE_HOME } from 'redux/routesMap';
import {
  Menu,
  Container,
} from 'semantic-ui-react';


const actionToComponentPath = {
  [ ROUTE_HOME ]: 'Home/Home',
  [ NOT_FOUND ]: 'NotFound/NotFound',
};

@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class App extends Component {
  static propTypes = {
    routeAction: PropTypes.string.isRequired,
  };

  constructor( props ) {
    super(props);
    this.state = {
      PageComponent: null,
    };
  }

  loadComponent = async () => {
    const { routeAction } = this.props;
    const componentPath = actionToComponentPath[routeAction];
    const component = await import(`../../pages/${componentPath}`);
    this.setState({
      PageComponent: component.default,
    });
  }

  componentDidMount() {
    this.loadComponent();
  }

  componentDidUpdate( prevProps /* , prevState */ ) {
    const routeChanged = ( prevProps.routeAction !== this.props.routeAction );
    if ( routeChanged ) {
      this.loadComponent();
    }
  }

  render() {
    const { PageComponent } = this.state;

    return (
      <div className={ styles.app } >
        <Menu
          inverted
          size="massive"
          fixed="top"
        >
          <Container>
            <Menu.Item as={Link} to="/" header>
              Verkada Command Center
            </Menu.Item>
          </Container>
        </Menu>
        <Container text className={ styles.app__container }>
          { PageComponent && <PageComponent /> }
        </Container>
      </div>
    );
  }
}

export default hot(module)(App);
