import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import {
  ListView,
  TouchableOpacity,
  Tile,
  Overlay,
  Subtitle,
  Row,
  Image,
  View,
  Caption,
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

class ColumnArticles extends Component {

  state={
    articlesData: [],
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
    getRequest(`${baseURL}column/${id}/posts?max_id=${max_id}`, (respnseData) => {
      this.setState({
        articlesData: respnseData.posts,
      });
    }, (error) => {
      alert(error);
    })
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
      description,
    } = params;
    return (
      <Tile styleName='text-centric'>
        <Overlay><Subtitle>{name}</Subtitle></Overlay>
        <Subtitle styleName='md-gutter-top'>{description}</Subtitle>
      </Tile>
    )
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
    )
  }
}

export default ColumnArticles;
