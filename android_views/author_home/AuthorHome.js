import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import {
  Text,
  View,
  Spinner,
  Screen,
  ListView,
  Row,
  Image,
  Subtitle,
  Caption,
  RichMedia,
  Icon,
  Button,
  TouchableOpacity,
  Tile,
  Title,
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

class AuthorHome extends Component {

  state={
    articlesData: [],
    loading: true,
    max_id: '',
  }

  componentWillMount=() => {
    this.getArticlesData();
  }

  getArticlesData=() => {
    const { params = {} } = this.props.navigation.state;
    const id = params.id;
    const {
      max_id,
    } = this.state;
    getRequest(`${baseURL}author/${id}/posts?count=10&max_id=${max_id}`, (respnseData) => {
      this.setState({
        loading: false,
        articlesData: respnseData.posts,
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
      published_time,
      id,
    } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          const { navigate } = this.props.navigation;
          navigate('ArticleDetail', { id });
        }}
      >
        <Row>
          <Image
            styleName='small rounded-corners'
            source={{ uri: url || 'https://is4-ssl.mzstatic.com/image/thumb/Purple18/v4/88/13/e2/8813e2cf-6cd2-a6b0-4028-3b0a5bac0f57/source/512x512bb.jpg' }}
          />
          <View styleName='vertical stretch space-between'>
            <Subtitle numberOfLines={1}>{title}</Subtitle>
            <Text numberOfLines={2}>{abstract}</Text>
            <Caption>{published_time.slice(0, 16)}</Caption>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }

  renderHeader=() => {
    const { params } = this.props.navigation.state;
    const {
      name,
      resume,
      large_avatar,
    } = params;
    return (
      <Tile styleName='text-centric'>
        <Image
          styleName='small rounded-corners'
          source={{ uri: large_avatar }}
        />
        <Title>{name}</Title>
        <Subtitle styleName='sm-gutter-top'>{resume}</Subtitle>
      </Tile>
    );
  }

  render() {
    const {
      articlesData,
    } = this.state;
    return (
      <ListView
        data={articlesData}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
      />
    );
  }
}

export default AuthorHome;
