import React from 'react';
import {
  View,
  Text,
} from '@shoutem/ui';

const styles = {
  noMore: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
};

const NoMore = ({ text='别扯了，没有了' }) => (
  <View style={styles.noMore}>
    <Text>—— {text} ——</Text>
  </View>
);

export default NoMore;
