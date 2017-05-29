import React, { Component } from 'react';
import {
  Text,
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

const styles = {
  authorItem: {
    marginBottom: 4,
  },
};

class PopularAuthors extends Component {

  state={
    loading: true,
    popularAuthorsData: [],
    start: 0,
  }

  componentWillMount=() => {
    this.getPopularAuthorsData();
  }

  getPopularAuthorsData=(start = 0, popularAuthorsData = []) => {
    this.setState({
      loading: true,
    });
    getRequest(`${baseURL}auth_authors/all?count=10&start=${start}`, (respnseData) => {
      const {
        authors,
      } = respnseData;
      this.setState({
        loading: false,
        start: start + 5,
        popularAuthorsData: popularAuthorsData.concat(authors),
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
        style={styles.authorItem}
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

  onRefresh=() => {
    this.getPopularAuthorsData();
  }

  onLoadMore=() => {
    const {
      start,
      popularAuthorsData,
    } = this.state;
    this.getPopularAuthorsData(start, popularAuthorsData);
  }

  render() {
    const {
      loading,
      popularAuthorsData,
    } = this.state;
    return (
      <ListView
        loading={loading}
        data={popularAuthorsData}
        renderRow={this.renderRow}
        onRefresh={this.onRefresh}
        onLoadMore={this.onLoadMore}
      />
    );
  }
}

export default PopularAuthors;
