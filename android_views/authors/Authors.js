import React, { Component } from 'react';
import {
  Text,
  Button
} from '@shoutem/ui';
import { TabNavigator } from 'react-navigation';

import RecommendAuthors from './../recommend_authors/RecommendAuthors';
import PopularAuthors from './../popular_authors/PopularAuthors';

const AuthorTab = TabNavigator({
  RecommendAuthors: { screen: RecommendAuthors },
  PopularAuthors: { screen: PopularAuthors },
}, {
  tabBarPosition: 'bottom',
});

class Auathor extends Component {
  static navigationOptions = {
    title: '作者',
    drawerLabel: '作者',
  }

  render() {
    return (
      <AuthorTab />
    );
  }
}

export default Auathor;
