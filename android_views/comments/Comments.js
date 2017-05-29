import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Row,
  Image,
  Subtitle,
  Caption,
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

import NoMore from './../common/NoMore';

const styles = {
  commentItem: {
    marginBottom: 6,
  },
  refCommentItem: {
    backgroundColor: '#eee',
  },
};

class Comments extends Component {
  state={
    commentsData: [],
    maxId: 0,
    loading: true,
    showNoMore: false,
  }

  componentWillMount=() => {
    this.getCommentsData();
  }

  getCommentsData=(maxId = 0, commentsData = []) => {
    const { params } = this.props.navigation.state;
    const id = params.id;
    this.setState({
      loading: true,
    });
    getRequest(`${baseURL}post/${id}/comments?count=10&max_id=${maxId}`, (responseData = {}) => {
      const {
        comments: newCommentsData = [],
      } = responseData;
      this.setState({
        loading: false,
        showNoMore: true,
        commentsData: commentsData.concat(newCommentsData),
        maxId: newCommentsData.length === 10 ? newCommentsData[newCommentsData.length - 1].id : 0,
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
      author: {
        name,
        avatar,
      } = {},
      content,
      created_time,
      ref_comment,
      ref_comment: {
        author: {
            name: ref_name,
        } = {},
        content: ref_content,
      } = {},
    } = item;
    return (
      <Row style={styles.commentItem}>
        <Image
          styleName='small-avatar top'
          source={{ uri: avatar }}
        />
        <View styleName='vertical'>
          <View styleName='horizontal space-between'>
            <Subtitle styleName=''>{name}</Subtitle>
            <Caption>{ created_time.slice(0, 16) }</Caption>
          </View>
          {
              ref_comment ?
                <Row style={styles.refCommentItem}>
                  <View>
                    <Subtitle styleName=''>{ ref_name }</Subtitle>
                    <Text styleName='multiline'>{ ref_content }</Text>
                  </View>
                </Row> :
              null
          }
          <Text styleName='multiline'>{content}</Text>
        </View>
      </Row>
    );
  }

  renderFooter=() => {
    const {
      maxId,
      commentsData,
      showNoMore,
    } = this.state;
    const text = commentsData.length === 0 ? 'Oops！暂无评论' : '别扯了，没有了';
    return (
      !maxId && showNoMore ? <NoMore text={text} /> : null
    );
  }

  onRefresh=() => {
    this.getCommentsData();
  }

  onLoadMore=() => {
    const {
      maxId,
      commentsData,
    } = this.state;
    maxId ? this.getCommentsData(maxId, commentsData) : null
  }

  render() {
    const {
        commentsData,
        loading,
    } = this.state;
    return (
      <ListView
        loading={loading}
        data={commentsData}
        renderRow={this.renderRow}
        onRefresh={this.onRefresh}
        onLoadMore={this.onLoadMore}
        renderFooter={this.renderFooter}
      />
    );
  }
}

export default Comments;
