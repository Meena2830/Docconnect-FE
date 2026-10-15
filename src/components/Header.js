import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';
import { PlusIcon } from './Icons';

const Header = ({ onPlusPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoDoc}>Doc</Text>
        <Text style={styles.logoConnect}>Connect</Text>
      </View>
      <TouchableOpacity
        style={styles.plusButton}
        activeOpacity={0.8}
        onPress={onPlusPress}
      >
        <PlusIcon size={26} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoDoc: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  logoConnect: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});

export default Header;
