import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainDrawerNav from './../main_drawer_nav/MainDrawerNav';
import ArticleDetail from './../article_detail/ArticleDetail';

const APP = StackNavigator({
  MainDrawerNav: { screen: MainDrawerNav },
  ArticleDetail: { screen: ArticleDetail },
});

export default APP;
