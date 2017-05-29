import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Row,
  Image,
  Subtitle,
  Caption,
  TouchableOpacity,
  Tile,
  Title,
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

import NoMore from './../common/NoMore';

const styles = {
  articleItem: {
    marginBottom: 6,
  },
};

class AuthorHome extends Component {

  state={
    loading: true,
    articlesData: [],
    maxId: 0,
    showNoMore: false,
  }

  componentWillMount=() => {
    this.getArticlesData();
  }

  getArticlesData=(maxId = 0, articlesData = []) => {
    this.setState({
      loading: true,
    });
    const { params = {} } = this.props.navigation.state;
    const id = params.id;
    getRequest(`${baseURL}author/${id}/posts?count=10&max_id=${maxId}`, (responseData = {}) => {
      const {
        posts = [],
      } = responseData;
      this.setState({
        loading: false,
        articlesData: articlesData.concat(posts),
        maxId: posts.length === 10 ? posts[posts.length - 1].id : 0,
        showNoMore: true,
      });
    }, (error) => {
      this.setState({
        loading: false,
        showNoMore: true,
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
        style={styles.articleItem}
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

  renderFooter=() => {
    const {
      maxId,
      articlesData,
      showNoMore,
    } = this.state;
    const text = articlesData.length === 0 ? 'Oops！该童鞋暂无文章！' : '别扯了，没有了';
    return (
      !maxId && showNoMore ? <NoMore text={text} /> : null
    );
  }

  onRefresh=() => {
    this.getArticlesData();
  }

  onLoadMore=() => {
    const {
      maxId,
      articlesData,
    } = this.state;
    maxId ? this.getArticlesData(maxId, articlesData) : null
  }

  render() {
    const {
      articlesData,
      loading,
    } = this.state;
    return (
      <ListView
        loading={loading}
        data={articlesData}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        onRefresh={this.onRefresh}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

export default AuthorHome;
