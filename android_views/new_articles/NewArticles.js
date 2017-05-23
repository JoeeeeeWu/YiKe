import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Text,
  View,
  Screen,
  ListView,
  Image,
  Tile,
  Title,
  TouchableOpacity,
  Caption,
  Icon,
} from '@shoutem/ui';

import { getRequest, getTodayStr } from './../common/util';
import { baseURL } from './../common/constant';

const styles = {
  articleItemContainer: {
    marginVertical: 10,
  },
  menuIcon: {
    marginLeft: 20,
  },
};

class NewArticles extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '今日一刻',
    drawerLabel: '今日一刻',
    headerLeft: <Icon name='sidebar' style={styles.menuIcon} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
  })

  state={
    loading: false,
    newArticlesData: [],
  }

  componentWillMount=() => {
    this.getNewArticlesData();
  }

  getNewArticlesData=() => {
    this.setState({
      loading: true,
    });
    getRequest(`${baseURL}stream/date/${getTodayStr()}`, (respnseData) => {
      const {
        posts,
      } = respnseData;
      this.setState({
        newArticlesData: posts,
        loading: false,
      });
    }, (error) => {
      this.setState({
        loading: false,
      });
      alert(error);
    });
  }

  renderRow=(item = {}) => {
    const {
      thumbs: [{
        medium: {
          url,
        } = {},
      } = {}] = [],
      title,
      abstract,
      id,
    } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          const { navigate } = this.props.navigation;
          navigate('ArticleDetail', { id });
        }}
        style={styles.articleItemContainer}
      >
        <Tile>
          <Image
            styleName='large-banner'
            source={{ uri: url }}
          />
          <View styleName='content'>
            <Title>{title}</Title>
            <Text>{abstract}</Text>
            <View styleName='horizontal space-between'>
              <Caption>1 hour ago</Caption>
              <Caption>15:34</Caption>
            </View>
          </View>
        </Tile>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      loading,
      newArticlesData,
    } = this.state;
    return (
      <Screen>
        <ListView
          data={newArticlesData}
          renderRow={this.renderRow}
          loading={loading}
        />
      </Screen>
    );
  }
}

export default NewArticles;
