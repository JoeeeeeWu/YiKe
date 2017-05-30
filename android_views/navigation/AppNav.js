import React from 'react';
import {
  Icon,
  Subtitle,
  TouchableOpacity,
 } from '@shoutem/ui';
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
} from 'react-navigation';

import PastArticles from './../past_articles/PastArticles';
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
    color: '#fff',
  },
  headerRight: {
    marginRight: 20,
    backgroundColor: '#1cc4ad',
    color: '#fff',
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
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  ArticleDetail: {
    screen: ArticleDetail,
    navigationOptions: ({ navigation }) => ({
      title: '文章',
      headerTintColor: '#fff',
      headerRight: <TouchableOpacity>
        <Subtitle
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
          查看评论
        </Subtitle>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  Comments: {
    screen: Comments,
    navigationOptions: ({ navigation }) => ({
      title: '文章评论',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

});

const PastArticlesStackNav = StackNavigator({

  PastArticlesScreen: {
    screen: PastArticles,
    navigationOptions: ({ navigation }) => ({
      title: '往期文章',
      headerLeft: <Icon
        name='sidebar'
        style={styles.menuIcon}
        onPress={() => {
          navigation.navigate('DrawerOpen');
        }}
      />,
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  ArticleDetail: {
    screen: ArticleDetail,
    navigationOptions: ({ navigation }) => ({
      title: '文章',
      headerTintColor: '#fff',
      headerRight: <TouchableOpacity>
        <Subtitle
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
          查看评论
        </Subtitle>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  Comments: {
    screen: Comments,
    navigationOptions: ({ navigation }) => ({
      title: '文章评论',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
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
  tabBarOptions: {
    style: {
      backgroundColor: '#fff',
    },
    activeTintColor: '#1cc4ad',
    inactiveTintColor: '#000',
    indicatorStyle: {
      height: 0,
    },
  },
});

const AuthorsStackNav = StackNavigator({

  AuthorsScreen: {
    screen: AuthorTab,
    navigationOptions: ({ navigation }) => ({
      title: '作者',
      headerLeft: <Icon name='sidebar' style={styles.menuIcon} onPress={() => { navigation.navigate('DrawerOpen'); }} />,
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  AuthorHome: {
    screen: AuthorHome,
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;
      const name = params.name;
      return {
        title: `${name}的主页`,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1cc4ad',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      };
    },
  },

  ArticleDetail: {
    screen: ArticleDetail,
    navigationOptions: ({ navigation }) => ({
      title: '文章',
      headerTintColor: '#fff',
      headerRight: <TouchableOpacity>
        <Subtitle
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
          查看评论
        </Subtitle>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  Comments: {
    screen: Comments,
    navigationOptions: ({ navigation }) => ({
      title: '文章评论',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

});

const ColumnsStackNav = StackNavigator({

  ColumnsScreen: {
    screen: Columns,
    navigationOptions: ({ navigation }) => ({
      title: '栏目',
      headerLeft: <Icon
        name='sidebar'
        style={styles.menuIcon}
        onPress={() => {
          navigation.navigate('DrawerOpen');
        }}
      />,
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  ColumnArticles: {
    screen: ColumnArticles,
    navigationOptions: ({navigation}) => {
      const { params } = navigation.state;
      const name = params.name;
      return {
        title: `${name}栏目`,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#1cc4ad',
        },
        headerTitleStyle: {
          color: '#fff',
        },
      };
    },
  },

  ArticleDetail: {
    screen: ArticleDetail,
    navigationOptions: ({ navigation }) => ({
      title: '文章',
      headerTintColor: '#fff',
      headerRight: <TouchableOpacity>
        <Subtitle
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
          查看评论
        </Subtitle>
      </TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
    }),
  },

  Comments: {
    screen: Comments,
    navigationOptions: ({ navigation }) => ({
      title: '文章评论',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1cc4ad',
      },
      headerTitleStyle: {
        color: '#fff',
      },
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

}, {
  drawerWidth: 200,
  contentOptions: {
    activeTintColor: '#1cc4ad',
  },

});

export default AppNav;
