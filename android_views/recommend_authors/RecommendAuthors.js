import React, { Component } from 'react';
import {
  Text,
  Button,
  ListView,
  Screen,
  Row,
  Subtitle,
  Caption,
  Image,
  View,
  Icon,
  Divider,
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

class RecommendAuthors extends Component {

  static navigationOptions = {
    tabBarLabel: '推荐作者',
  }

  state={
    loading: true,
    recommendAuthorsData: [],
  }

  componentWillMount=() => {
    this.getRecommentAuthorsData();
  }

  getRecommentAuthorsData=() => {
    getRequest(`${baseURL}auth_authors/rec`, (respnseData) => {
      const {
        authors,
      } = respnseData;
      this.setState({
        recommendAuthorsData: authors,
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
      avatar,
      name,
      editor_notes,
    } = item;
    return (
      <Row styleName='small'>
        <Image
          styleName='small-avatar'
          source={{ uri: avatar }}
        />
        <View styleName='vertical'>
          <Subtitle>{ name }</Subtitle>
          <Text numberOfLines={1}>{ editor_notes }</Text>
        </View>
        <Icon styleName='disclosure' name='right-arrow' />
      </Row>
    );
  }

  renderSeparator=() => <Divider styleName='line' />

  render() {
    const {
      recommendAuthorsData,
      loading,
    } = this.state;
    return (
      <Screen>
        <ListView
          data={recommendAuthorsData}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          loading={loading}
        />
      </Screen>
    );
  }
}

export default RecommendAuthors;
