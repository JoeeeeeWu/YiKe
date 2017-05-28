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
    marginVertical: 8,
  },
};

const NoMore = () => (
  <View style={styles.noMore}>
    <Text>—— 别扯了，没有了 ——</Text>
  </View>
);

export default NoMore;
