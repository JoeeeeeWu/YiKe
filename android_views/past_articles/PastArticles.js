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

class PastArticles extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '往期文章',
    drawerLabel: '往期文章',
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

export default PastArticles;
