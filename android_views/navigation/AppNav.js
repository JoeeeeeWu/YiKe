import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Icon,
  Button,
  Examples,
 } from '@shoutem/ui';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import PastArticles from './../past_articles/PastArticles';
import Authors from './../authors/Authors';
import Columns from './../columns/Columns';
import ColumnArticles from './../column_articles/ColumnArticles';
import NewArticles from './../new_articles/NewArticles';
import ArticleDetail from './../article_detail/ArticleDetail';
import Comments from './../comments/Comments';
import AuthorHome from './../author_home/AuthorHome';
import RecommendAuthors from './../recommend_authors/RecommendAuthors';
import PopularAuthors from './../popular_authors/PopularAuthors';

const styles = {
  menuIcon: {
    marginLeft: 20,
  },
  headerRight: {
    marginRight: 20,
  },
};

const AppStackNav = StackNavigator({

  NewArticles: {
    screen: NewArticles,
    navigationOptions: ({ navigation }) => ({
      title: '今日一刻',
      headerLeft: <Icon
        name='sidebar'
        style={styles.menuIcon}
        onPress={() => {
          navigation.navigate('DrawerOpen');
        }}
      />,
    }),
  },

  ArticleDetail: {
    screen: ArticleDetail,
    navigationOptions: ({ navigation }) => ({
      headerRight: <Button
        style={styles.headerRight}
        onPress={() => {
          const {
            state: {
              params,
            } = {},
            navigate,
          } = navigation;
          const id = params.id;
          navigate('Comments', { id });
        }}
      >
        <Text>查看评论</Text>
      </Button>,
    }),
  },

  Comments: {
    screen: Comments,
    navigationOptions: ({ navigation }) => ({
      title: '文章评论',
    }),
  },

  AuthorHome: {
    screen: AuthorHome,
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;
      const name = params.name;
      return {
        title: `${name}的主页`,
      };
    },
  },

  ColumnArticles: {
    screen: ColumnArticles,
  },
});

const PastArticlesStackNav = StackNavigator({
  PastArticlesScreen: {
    screen: PastArticles,
    navigationOptions: ({ navigation }) => ({
      title: '往期文章',
      headerLeft: <Icon name='sidebar' style={styles.menuIcon} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
    }),
  },
});

const AuthorTab = TabNavigator({
  RecommendAuthors: {
    screen: RecommendAuthors,
    navigationOptions: {
      tabBarLabel: '推荐作者',
    },
  },
  PopularAuthors: {
    screen: PopularAuthors,
    navigationOptions: {
      tabBarLabel: '热门作者',
    },
  },
}, {
  tabBarPosition: 'bottom',
});

const AuthorsStackNav = StackNavigator({
  AuthorsScreen: {
    screen: AuthorTab,
    navigationOptions: ({ navigation }) => ({
      title: '作者',
      headerLeft: <Icon name='sidebar' style={styles.menuIcon} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
    }),
  },
});

const ColumnsStackNav = StackNavigator({
  ColumnsScreen: {
    screen: Columns,
    navigationOptions: ({ navigation }) => ({
      title: '栏目',
      headerLeft: <Icon name='sidebar' style={styles.menuIcon} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
    }),
  },
});

const AppNav = DrawerNavigator({
  AppDrawerNavItem: {
    screen: AppStackNav,
    navigationOptions: {
      drawerLabel: '今日一刻',
    },
  },
  PastArticlesDrawerNavItem: {
    screen: PastArticlesStackNav,
    navigationOptions: {
      drawerLabel: '往期文章',
    },
  },
  AuthorsDrawerNavItem: {
    screen: AuthorsStackNav,
    navigationOptions: {
      drawerLabel: '作者',
    },
  },
  ColumnsDrawerNavItem: {
    screen: ColumnsStackNav,
    navigationOptions: {
      drawerLabel: '栏目',
    },
  },
  Examples: { screen: Examples },
}, {
  drawerWidth: 200,
});

export default AppNav;
