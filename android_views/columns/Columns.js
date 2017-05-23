import React, { Component } from 'react';
import {
  Text,
  Button,
  Icon,
} from '@shoutem/ui';

const styles = {
  menuIcon: {
    marginLeft: 20,
  },
};

class Columns extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '栏目',
    drawerLabel: '栏目',
    headerLeft: <Icon name='sidebar' style={styles.menuIcon} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
  })

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
