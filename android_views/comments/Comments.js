import React, { Component } from 'react';
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
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

const styles = {
  commentItem: {
    marginVertical: 6,
  },
  refCommentItem: {
      backgroundColor: '#eee',
  }
};

class Comments extends Component {
    state={
        commentsData: [],
        maxId: 0,
        loading: true,
    }

    componentWillMount=() => {
        this.getCommentsData();
    }

    getCommentsData=() => {
        const {
            maxId
        }=this.state;
        const { params } = this.props.navigation.state;
        const id = params.id;
        getRequest(`${baseURL}post/${id}/comments?count=10&max_id=${maxId}`, (respnseData) => {
            console.log(respnseData);
            this.setState({
                loading: false,
                commentsData: respnseData.comments,
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
      author: {
        name,
        avatar,
      } = {},
      content,
      created_time,
      ref_comment,
      ref_comment: {
        author: {
            avatar: ref_avatar,
            name: ref_name,
        }={},
        content: ref_content,
        created_time: ref_created_time,
      }={},
    } = item;
    console.log(item);
    return (
      <Row style={styles.commentItem}>
        <Image
          styleName='small-avatar top'
          source={{ uri: avatar }}
        />
        <View styleName='vertical'>
          <View styleName='horizontal space-between'>
            <Subtitle styleName=''>{name}</Subtitle>
            <Caption>{created_time}</Caption>
          </View>
          {
              ref_comment ?
              <Row style={styles.refCommentItem}>
                <View>
                    <Subtitle styleName=''>{ref_name}</Subtitle>
                    <Text styleName='multiline'>{ref_content}</Text>
                </View>
              </Row> :
            null

          }

          <Text styleName='multiline'>{content}</Text>
        </View>
      </Row>
    );
  }

  renderHeader=() => {
    return (
      <Row>
        <Icon name="comment" />
        <Text numberOfLines={1}>评论</Text>
      </Row>
    )
  }

    render() {
        const {
            commentsData,
        }=this.state;
        console.log(commentsData);
        return (
            <ListView 
                data={commentsData}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        )
    }
}

export default Comments;