import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './App.scss';
import NotFoundPage from 'pages/NotFound/NotFound';
import Link from 'redux-first-router-link';
import { NOT_FOUND } from 'redux-first-router';
import routesMap, {
  ROUTE_HOME,
  ROUTE_DEMO,
} from 'redux/routesMap';


const actionToComponentPath = {
  [ ROUTE_HOME ]: 'Home/Home',
  [ ROUTE_DEMO ]: 'Demo/Demo',
  [ NOT_FOUND ]: 'NotFound/NotFound',
};

@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class App extends Component {
  static propTyopes = {
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

  componentDidUpdate( prevProps, prevState ) {
    const routeChanged = ( prevProps.routeAction !== this.props.routeAction );
    if ( routeChanged ) {
      this.loadComponent();
    }
  }

  render() {
    const { PageComponent } = this.state;

    return (
      <div className={ styles.app } >
        app
        <div className={ styles.app__inner } >
          app__inner
        </div>
        <Link to="/">Home</Link>
        <br />
        <Link to="/demo">Demo</Link>
        { PageComponent && <PageComponent /> }
      </div>
    );
  }
}

if ( module.hot ) {
  const { hot } = require('react-hot-loader');
  App = hot(module)(App);
}

export default App;
