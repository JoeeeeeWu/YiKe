import React, { Component } from 'react';
import {
  Text,
  Button,
  Icon,
} from '@shoutem/ui';
import { TabNavigator } from 'react-navigation';

import RecommendAuthors from './../recommend_authors/RecommendAuthors';
import PopularAuthors from './../popular_authors/PopularAuthors';

const styles = {
  menuIcon: {
    marginLeft: 20,
  },
};

const AuthorTab = TabNavigator({
  RecommendAuthors: { screen: RecommendAuthors },
  PopularAuthors: { screen: PopularAuthors },
}, {
  tabBarPosition: 'bottom',
});

class Auathor extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '作者',
    drawerLabel: '作者',
    headerLeft: <Icon name='sidebar' style={styles.menuIcon} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
  })

  render() {
    return (
      <AuthorTab />
    );
  }
}

export default Auathor;
