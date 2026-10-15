import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { COLORS } from '../theme/colors';

const LoadingView = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {Boolean(message) && <Text style={styles.text}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.backgroundLight,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});

export default LoadingView;
