import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';

import Home from '../screens/Home';
import Ticket from '../screens/Ticket';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const IconDir = {
  home: require('../../img/icon/home.png'),
  ticket: require('../../img/icon/ticket.png'),
  profile: require('../../img/icon/user.png'),
};

const TabBarIcon = ({
  focused,
  iconSource,
}: {
  focused: boolean;
  iconSource: any;
}) => {
  const opacityValue = focused ? 1 : 0.5;
  return (
    <Image
      source={iconSource}
      style={[styles.icon, { opacity: opacityValue }]}
      resizeMode="contain"
    />
  );
};

const BottomNavigator = () => {
  const getTabBarIcon = (routeName: string, focused: boolean) => {
    let iconSource = IconDir.home;

    if (routeName === 'Home') {
      iconSource = IconDir.home;
    } else if (routeName === 'Ticket') {
      iconSource = IconDir.ticket;
    } else if (routeName === 'Profile') {
      iconSource = IconDir.profile;
    }

    return <TabBarIcon focused={focused} iconSource={iconSource} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Ticket" component={Ticket} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#131E2E',
    height: 84,
    paddingBottom: 50,
    paddingTop: 15,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
});

export default BottomNavigator;
