/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import APP from './android_views/app/APP';

class YiKe extends Component {
  render() {
    return (
      <APP />
    );
  }
}

AppRegistry.registerComponent('YiKe', () => YiKe);
