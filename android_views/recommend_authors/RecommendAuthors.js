import React, { Component } from 'react';
import {
  Text,
  Button,
  ListView,
  Screen,
  Row,
  Subtitle,
  Caption,
  Image,
  View,
  Icon,
  TouchableOpacity,
} from '@shoutem/ui';
import NoMore from './../common/NoMore';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

class RecommendAuthors extends Component {

  state={
    loading: true,
    recommendAuthorsData: [],
  }

  componentWillMount=() => {
    this.getRecommentAuthorsData();
  }

  getRecommentAuthorsData=() => {
    getRequest(`${baseURL}auth_authors/rec`, (respnseData) => {
      const {
        authors,
      } = respnseData;
      this.setState({
        recommendAuthorsData: authors,
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
      avatar,
      large_avatar,
      name,
      editor_notes,
      id,
      resume,
    } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          const { navigate } = this.props.navigation;
          navigate('AuthorHome', { id, name, resume, large_avatar });
        }}
      >
        <Row styleName='small'>
          <Image
            styleName='small-avatar'
            source={{ uri: avatar }}
          />
          <View styleName='vertical'>
            <Subtitle>{ name }</Subtitle>
            <Text numberOfLines={1}>{ editor_notes }</Text>
          </View>
          <Icon styleName='disclosure' name='right-arrow' />
        </Row>
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
      recommendAuthorsData,
      loading,
    } = this.state;
    return (
      <Screen>
        <ListView
          data={recommendAuthorsData}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          loading={loading}
        />
      </Screen>
    );
  }
}

export default RecommendAuthors;
