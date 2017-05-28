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
  Icon,
} from '@shoutem/ui';

class ArticleDetail extends Component {

  render() {
    const { params } = this.props.navigation.state;
    const id = params.id;
    return (
      <WebView source={{ uri: `https://moment.douban.com/post/${id}` }} />
    );
  }
}

export default ArticleDetail;
