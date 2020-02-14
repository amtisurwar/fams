import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { AsyncStorage, AppState, BackHandler } from 'react-native';
import { createStackNavigator, addNavigationHelpers, createReactNavigationReduxMiddleware } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import AppWithNavigationState from './appNavigator';

import store from './src/redux/configureStore';
let notificationCount= 0;

console.disableYellowBox = true;

// const middleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
// );




export default class App extends Component {

  state = {
    appState: AppState.currentState,
    isChecking: false
  }

  componentDidMount() {
    AppState.addEventListener('change', this.callbackOnAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.callbackOnAppStateChange);
  }

  callbackOnAppStateChange = (app_state) => {
    if (app_state === 'active') {
        this.setState({ isChecking: true })
    }
    if(app_state === 'inactive' || app_state === 'background') {

    }
  }

  render() {
    if(this.state.isChecking) {
      return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      );
    } else {
      return null;
    }
  }
}
