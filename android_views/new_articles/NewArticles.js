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
import NoMore from './../common/NoMore';

import { getRequest, getTodayStr } from './../common/util';
import { baseURL } from './../common/constant';

const styles = {
  articleItemContainer: {
    marginBottom: 14,
  },
};

class NewArticles extends Component {

  state={
    loading: true,
    newArticlesData: [],
  }

  componentWillMount=() => {
    this.getNewArticlesData();
  }

  getNewArticlesData=() => {
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
      published_time,
      comments_count,
    } = item;
    return (
      <TouchableOpacity
        style={styles.articleItemContainer}
        onPress={() => {
          const { navigate } = this.props.navigation;
          navigate('ArticleDetail', { id });
        }}
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

  renderFooter=() => (
    this.state.loading ?
    null :
    <NoMore />
  )

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
          renderFooter={this.renderFooter}
          loading={loading}
        />
      </Screen>
    );
  }
}

export default NewArticles;
