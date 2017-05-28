import React, { Component } from 'react';
import {
  Text,
  Button,
  Icon,
  ListView,
  Tile,
  Overlay,
  Title,
  Heading,
  TouchableOpacity,
  GridRow,
  Subtitle,
} from '@shoutem/ui';

import { getRequest } from './../common/util';
import { baseURL } from './../common/constant';

class Columns extends Component {

  state={
    columnsData: [],
  }

  componentWillMount=() => {
    this.getColumnsData();
  }

  getColumnsData=() => {
    getRequest(`${baseURL}columns`, (respnseData = {}) => {
      this.setState({
        columnsData: respnseData.columns,
      });
    }, (error) => {
      alert(error);
    });
  }

  renderRow=(rowData, sectionId, index) => {
    const cellViews = rowData.map((item = {}, id) => {
      const {
        name,
        description,
        id: columnId,
      } = item;
      return (
        <TouchableOpacity
          key={id}
          styleName='flexible'
          onPress={() => {
            const { navigate } = this.props.navigation;
            navigate('ColumnArticles', { name, description, id: columnId });
          }}
        >
          <Tile styleName='flexible text-centric'>
            <Overlay><Subtitle>{name}</Subtitle></Overlay>
            <Subtitle styleName='md-gutter-top'>{description}</Subtitle>
          </Tile>
        </TouchableOpacity>
      )
    });
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    );
  }

  render() {
    const {
      columnsData,
    } = this.state;
    const groupedData = GridRow.groupByRows(columnsData, 2);
    return (
      <ListView
        data={groupedData}
        renderRow={this.renderRow}
      />
    );
  }
}

export default Columns;
