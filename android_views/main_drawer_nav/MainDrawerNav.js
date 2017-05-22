import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';

import NewArticles from './../new_articles/NewArticles';
import PastArticles from './../past_articles/PastArticles';
import Authors from './../authors/Authors';
import Columns from './../columns/Columns';

const MainDrawerNav = DrawerNavigator({
  NewArticles: { screen: NewArticles },
  PastArticles: { screen: PastArticles },
  Authors: { screen: Authors },
  Columns: { screen: Columns },
}, {
  drawerWidth: 200,
});

export default MainDrawerNav;
