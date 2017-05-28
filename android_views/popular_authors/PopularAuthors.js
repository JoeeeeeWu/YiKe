import React, { Component } from 'react';
import {
  Text,
  Button,
  TouchableOpacity,
  Row,
  Image,
  View,
  Subtitle,
  Icon,
  ListView,
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

class PopularAuthors extends Component {

  state={
    popularAuthorsData: [],
    start: 0,
  }

  componentWillMount=() => {
    this.getPopularAuthorsData();
  }

  getPopularAuthorsData=() => {
    const {
      start,
    } = this.state;
    getRequest(`${baseURL}auth_authors/all?count=10&start=${start}`, (respnseData) => {
      const {
        authors,
      } = respnseData;
      this.setState({
        popularAuthorsData: authors,
      });
    }, (error) => {
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

  render() {
    const {
      popularAuthorsData,
    } = this.state;
    return (
      <ListView
        data={popularAuthorsData}
        renderRow={this.renderRow}
      />
    );
  }
}

export default PopularAuthors;
