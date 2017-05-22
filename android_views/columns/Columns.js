import React, { Component } from 'react';
import {
  Text,
  Button
} from '@shoutem/ui';

class Columns extends Component {
  static navigationOptions = {
    title: '栏目',
    drawerLabel: '栏目',
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

export default Columns;
