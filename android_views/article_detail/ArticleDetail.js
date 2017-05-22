import React, { Component } from 'react';
import { WebView } from 'react-native';
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
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

const styles = {
  commentItemContainer: {
    marginVertical: 6,
  },
};

class ArticleDetail extends Component {
  state={
    articleDetailData: {},
    popularCommentsData: [],
    loading: false,
  }

  getArticleDetailData=() => {
    const { params } = this.props.navigation.state;
    const id = params.id;
    alert(id);
    this.setState({
      loading: true,
    });
    getRequest(`${baseURL}post/${id}`, (respnseData) => {
      this.setState({
        loading: false,
        articleDetailData: respnseData,
      });
    }, (error) => {
      this.setState({
        loading: false,
      });
      alert(error);
    });
  }

  getPopularComment=() => {
    const { params } = this.props.navigation.state;
    const id = params.id;
    getRequest(`${baseURL}post/${id}/popular_comments`, (responseData) => {
      console.log(responseData);
      this.setState({
        popularCommentsData: responseData.comments,
      });
    }, (error) => {
      alert(error);
    });
  }

  componentWillMount=() => {
    this.getArticleDetailData();
    this.getPopularComment();
  }

  renderRow=(item = {}) => {
    const {
      author: {
        name,
        avatar,
      } = {},
      content,
      created_time,
    } = item;
    return (
      <Row style={styles.commentItemContainer}>
        <Image
          styleName='small-avatar top'
          source={{ uri: avatar }}
        />
        <View styleName='vertical'>
          <View styleName='horizontal space-between'>
            <Subtitle styleName=''>{name}</Subtitle>
            <Caption>{created_time}</Caption>
          </View>
          <Text styleName='multiline'>{content}</Text>
        </View>
      </Row>
    );
  }

  render() {
    const {
      loading,
      articleDetailData: {
        content,
        photos = [],
      } = {},
      popularCommentsData = [],
    } = this.state;
    let _content = content;
    console.log(popularCommentsData);
    photos.forEach((item = {}, index) => {
      const {
        tag_name,
        medium: {
          url,
        } = {},
      } = item;
      const oldImageStr = `<img id="${tag_name}" />`;
      const newImageStr = `<img id="${tag_name}" src="${url}"/>`;
      _content = _content.replace(oldImageStr, newImageStr);
    });
    return (
      <Screen>
        {
          loading ?
            <Spinner /> :
            <View>
              <Row>
                <Text numberOfLines={1}>热门评论</Text>
              </Row>
              <ListView
                data={popularCommentsData}
                renderRow={this.renderRow}
              />
            </View>
        }
      </Screen>
    );
  }
}

export default ArticleDetail;
