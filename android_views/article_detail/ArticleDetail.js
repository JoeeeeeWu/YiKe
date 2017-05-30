import React from 'react';
import { WebView } from 'react-native';

const ArticleDetail = ({ navigation }) => {
  const { params } = navigation.state;
  const id = params.id;
  const jsCode = `
      var node=document.querySelector('.bs-header');
      node.style.display='none';
  `;
  return (
    <WebView
      source={{ uri: `https://moment.douban.com/post/${id}` }}
      startInLoadingState
      javaScriptEnabled
      injectedJavaScript={jsCode}
    />
  );
};

export default ArticleDetail;
