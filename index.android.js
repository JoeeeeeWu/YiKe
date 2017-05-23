/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import AppNav from './android_views/navigation/AppNav';

class YiKe extends Component {
  render() {
    return (
      <AppNav />
    );
  }
}

AppRegistry.registerComponent('YiKe', () => YiKe);
