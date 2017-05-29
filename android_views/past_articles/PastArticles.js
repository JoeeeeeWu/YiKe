import React, { Component } from 'react';
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
} from '@shoutem/ui';

import { getRequest, getTodayStr } from './../common/util';
import { baseURL } from './../common/constant';

const styles = {
  articleItemContainer: {
    marginBottom: 14,
  },
};

class PastArticles extends Component {

  state={
    loading: true,
    pastArticlesData: [],
    preDay: 1,
  }

  componentWillMount=() => {
    this.getPastArticleData();
  }

  getPastArticleData=(preDay = 1, pastArticlesData = []) => {
    this.setState({
      loading: true,
    });
    getRequest(`${baseURL}stream/date/${getTodayStr(preDay)}`, (respnseData) => {
      const {
        posts,
      } = respnseData;
      this.setState({
        pastArticlesData: pastArticlesData.concat(posts),
        preDay: preDay + 1,
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
      published_time,
      comments_count,
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
          {
            url ?
              <Image
                styleName='large-banner'
                source={{ uri: url }}
              /> :
              null
          }
          <View styleName='content'>
            <Title>{title}</Title>
            <Text>{abstract}</Text>
            <View styleName='horizontal space-between'>
              <Caption>{published_time.slice(0, 16)}</Caption>
              <Caption>{`${comments_count}条评论`}</Caption>
            </View>
          </View>
        </Tile>
      </TouchableOpacity>
    );
  }

  onRefresh=() => {
    this.getPastArticleData();
  }

  onLoadMore=() => {
    const {
      preDay,
      pastArticlesData,
    } = this.state;
    this.getPastArticleData(preDay, pastArticlesData);
  }

  renderSectionHeader=() => {
    const {
      preDay,
    } = this.state;
    const header = getTodayStr(preDay);
    return (
      <Text>{header}</Text>
    );
  }

  render() {
    const {
      pastArticlesData,
      loading,
    } = this.state;
    return (
      <Screen>
        <ListView
          loading={loading}
          data={pastArticlesData}
          renderRow={this.renderRow}
          onRefresh={this.onRefresh}
          onLoadMore={this.onLoadMore}
        />
      </Screen>
    );
  }
}

export default PastArticles;
