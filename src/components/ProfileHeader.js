import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { getProfileImage } from '../assets/images';
import { ConnectBadgeIcon } from './Icons';

const ProfileHeader = ({ user }) => {
  if (!user) return null;

  const imageSource = getProfileImage(user.profileImage);
  const connections = user.connectionsCount ?? 2;

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={imageSource}
          style={styles.avatarImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.badge}>
        <ConnectBadgeIcon size={14} color={COLORS.primaryDark} />
        <Text style={styles.badgeText}>{connections} Connects</Text>
      </View>

      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userOccupation}>{user.occupation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: COLORS.backgroundLight,
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 72,
    height: 72,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: '#D4EBEB',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 14,
    marginBottom: 8,
    gap: 6,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  userOccupation: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    fontWeight: '400',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

export default ProfileHeader;
