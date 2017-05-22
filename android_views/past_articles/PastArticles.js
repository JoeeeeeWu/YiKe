import React, { Component } from 'react';
import {
  Text,
  Button
} from '@shoutem/ui';

class PastArticles extends Component {
  static navigationOptions = {
    title: '往期文章',
    drawerLabel: '往期文章',
  }

  render() {
    return (
      <Button
        onPress={() => {
          this.props.navigation.navigate('DrawerOpen')
        }}><Text>CHECK IN HERE</Text></Button>
    );
  }
}

export default PastArticles;
