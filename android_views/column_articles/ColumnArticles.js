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

const styles = {
  articleItem: {
    marginTop: 6,
  },
};

class ColumnArticles extends Component {

  state={
    loading: true,
    showNoMore: false,
    articlesData: [],
    maxId: 0,
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
    getRequest(`${baseURL}column/${id}/posts?count=10&max_id=${maxId}`, (responseData = {}) => {
      const {
        posts = [],
      } = responseData;
      this.setState({
        articlesData: articlesData.concat(posts),
        maxId: posts.length === 10 ? posts[posts.length - 1].id : 0,
        loading: false,
        showNoMore: true,
      });
    }, (error) => {
      this.setState({
        loading: false,
        showNoMore: true,
      });
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
      description,
    } = params;
    return (
      <Tile styleName='text-centric'>
        <Overlay><Subtitle>{name}</Subtitle></Overlay>
        <Subtitle styleName='md-gutter-top'>{description}</Subtitle>
      </Tile>
    );
  }

  renderFooter=() => {
    const {
      maxId,
      articlesData,
      showNoMore,
    } = this.state;
    const text = articlesData.length === 0 ? 'Oops！该栏目暂无文章！' : '别扯了，没有了';
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
    this.getArticlesData(maxId, articlesData);
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
    )
  }
}

export default ColumnArticles;
