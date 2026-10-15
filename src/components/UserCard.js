import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { getProfileImage } from '../assets/images';
import { AddUserIcon, ConnectBadgeIcon } from './Icons';

const UserCard = ({ user, isRequested, isConnecting, onConnect }) => {
  if (!user) return null;

  const profileImg = getProfileImage(user.profileImage);
  const connections = user.connectionsCount ?? 2;

  return (
    <View style={styles.card}>
      {/* Top Header Badge */}
      <View style={styles.badgeContainer}>
        <ConnectBadgeIcon size={14} color={COLORS.primaryDark} />
        <Text style={styles.badgeText}>{connections} Connects</Text>
      </View>

      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={profileImg}
          style={styles.avatarImage}
          resizeMode="contain"
        />
      </View>

      {/* Name and Occupation */}
      <Text style={styles.name} numberOfLines={1}>
        {user.name}
      </Text>
      <Text style={styles.occupation} numberOfLines={1}>
        {user.occupation}
      </Text>

      {/* Connect / Requested Button */}
      {isRequested ? (
        <View style={styles.requestedButton}>
          <Text style={styles.requestedText}>Requested</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => onConnect(user._id)}
          disabled={isConnecting}
          activeOpacity={0.8}
        >
          {isConnecting ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <View style={styles.buttonContent}>
              <AddUserIcon size={18} color={COLORS.white} />
              <Text style={styles.connectText}>Connect</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'DMSans_500Medium',
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 44,
    height: 44,
  },
  name: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  occupation: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 14,
  },
  connectButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 38,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  connectText: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
  },
  requestedButton: {
    backgroundColor: COLORS.requestedBg,
    borderRadius: 8,
    height: 38,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4EBEB',
  },
  requestedText: {
    color: COLORS.requestedText,
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
  },
});

export default UserCard;
