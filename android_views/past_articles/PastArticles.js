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
  Icon,
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

  getPastArticleData=() => {
    const {
      preDay,
    } = this.state;
    getRequest(`${baseURL}stream/date/${getTodayStr(preDay)}`, (respnseData) => {
      const {
        posts,
      } = respnseData;
      this.setState({
        pastArticlesData: posts,
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

  render() {
    const {
      pastArticlesData,
      loading,
    } = this.state;
    return (
      <Screen>
        <ListView
          data={pastArticlesData}
          renderRow={this.renderRow}
          loading={loading}
        />
      </Screen>
    );
  }
}

export default PastArticles;
