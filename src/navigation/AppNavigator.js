import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import { HomeFilledIcon, HomeOutlineIcon, SearchOutlineIcon } from '../components/Icons';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused ? (
                <HomeFilledIcon size={32} color={COLORS.primary} />
              ) : (
                <HomeOutlineIcon size={32} color={COLORS.textSecondary} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeSearchBadge]}>
              <SearchOutlineIcon
                size={28}
                color={focused ? COLORS.white : COLORS.textSecondary}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 68,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  activeSearchBadge: {
    backgroundColor: COLORS.primary,
  },
});

export default AppNavigator;
