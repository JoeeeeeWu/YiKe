import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import PastArticles from './../past_articles/PastArticles';
import Authors from './../authors/Authors';
import Columns from './../columns/Columns';
import NewArticles from './../new_articles/NewArticles';
import ArticleDetail from './../article_detail/ArticleDetail';
import Comments from './../comments/Comments';

const AppStackNav = StackNavigator({
  NewArticles: { screen: NewArticles },
  ArticleDetail: { screen: ArticleDetail },
  Comments: { screen: Comments },
});

const PastArticlesStackNav = StackNavigator({
  PastArticlesScreen: { screen: PastArticles },
});

const AuthorsStackNav = StackNavigator({
  AuthorsScreen: { screen: Authors },
});

const ColumnsStackNav = StackNavigator({
  ColumnsScreen: { screen: Columns },
});

const AppNav = DrawerNavigator({
  AppDrawerNavItem: { screen: AppStackNav },
  PastArticlesDrawerNavItem: { screen: PastArticlesStackNav },
  AuthorsDrawerNavItem: { screen: AuthorsStackNav },
  ColumnsDrawerNavItem: { screen: ColumnsStackNav },
}, {
  drawerWidth: 200,
});

export default AppNav;
