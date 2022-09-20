import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@screens/Home';
import EmptyScreen from '@screens/EmptyScreen';
import {Icon, AppTabBar} from '@components';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => <AppTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        // tabBarButton: props => <TabBarButton {...props} route={route} />,
      })}>
      <BottomTab.Screen name="Home" component={Home} />

      <BottomTab.Screen name="Message" component={EmptyScreen} />

      <BottomTab.Screen name="Search" component={EmptyScreen} />

      <BottomTab.Screen name="Library" component={EmptyScreen} />

      <BottomTab.Screen name="Account" component={EmptyScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = ScaledSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
});
