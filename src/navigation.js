import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Splash,
  Login,
  ForgetPass,
  VerificationKey,
  ShiftsScreen,
  Home,
  Logout,
  Notifications,
  ViewShift,
  Profile,
  Billing,
  ShiftsWeekScreen,
  Message,
  NewCard,
} from './views';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import customDrawerComponent from './genralComponents/customDrawerComponent';
const IconDrawer = name => (
  <Icon name={name} size={20} style={{left: 10}} color="#fff" />
);
var getList = {
  Shift: {
    screen: createStackNavigator({
      ShiftsScreen: {screen: ShiftsScreen, navigationOptions: {header: null}},
      ViewShift: {screen: ViewShift, navigationOptions: {header: null}},
    }),
    navigationOptions: {
      drawerIcon: IconDrawer('calendar-o'),
    },
  },
  'Shifts Week': {
    screen: createStackNavigator({
      ShiftsWeekScreen: {
        screen: ShiftsWeekScreen,
        navigationOptions: {header: null},
      },
      ViewShift: {screen: ViewShift, navigationOptions: {header: null}},
    }),
    navigationOptions: {
      drawerIcon: IconDrawer('calendar-o'),
    },
  },

  Notifications: {
    screen: Notifications,
    navigationOptions: {
      drawerIcon: IconDrawer('bell'),
    },
  },
  'My Profile': {
    screen: Profile,
    navigationOptions: {
      drawerIcon: IconDrawer('user'),
    },
  },
  Message: {
    screen: Message,
    navigationOptions: {
      drawerIcon: IconDrawer('envelope-o'),
    },
  },
  Billing: {
    screen: Billing,
    navigationOptions: {
      drawerIcon: IconDrawer('dollar'),
    },
  },
  'New Cred / license': {
    screen: NewCard,
    navigationOptions: {
      drawerIcon: IconDrawer('file-text-o'),
    },
  },
  'Log Out': {
    screen: Logout,
    navigationOptions: {
      drawerIcon: IconDrawer('sign-out'),
    },
  },
};

let drawerOptions = {
  contentComponent: customDrawerComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoure: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerWidth: 300,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'white',
    activeBackgroundColor: '#344059',
    itemsContainerStyle: {
      right: 20,
      marginHorizontal: 10,
      border: 100,
    },
    itemStyle: {
      height: 50,
      border: 60,
    },
    activeLabelStyle: {
      fontSize: 20,
      fontWeight: 'normal',
    },
    inactiveLabelStyle: {
      fontSize: 20,
      fontWeight: 'normal',
    },
    iconContainerStyle: {
      border: 60,
    },
  },
};
var MyDrawerNavigator = createDrawerNavigator(getList, drawerOptions);
var NotAuth = createStackNavigator({
  Login: {screen: Login, navigationOptions: {header: null}},
  ForgetPass: {screen: ForgetPass, navigationOptions: {header: null}},
  Verification: {screen: VerificationKey, navigationOptions: {header: null}},
});

var AppNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    NotAuth,
    Auth: MyDrawerNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(AppNavigator);
