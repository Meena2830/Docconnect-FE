import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from '../theme/colors';
import { updateUserProfile } from '../services/api';
import { CURRENT_USER_ID } from '../config/api';

const ProfileInformationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Available avatars to cycle through on camera badge tap
  const sampleAvatars = [
    null, // Default SVG silhouette
    require('../../assets/profiles/Image.png'),
    require('../../assets/profiles/Image-1.png'),
    require('../../assets/profiles/Image-2.png'),
    require('../../assets/profiles/Image-3.png'),
    require('../../assets/profiles/Image-4.png'),
  ];

  const handleToggleAvatar = () => {
    setAvatarIndex((prev) => (prev + 1) % sampleAvatars.length);
  };

  const handleContinue = () => {
    if (name.trim() || role.trim()) {
      updateUserProfile(CURRENT_USER_ID, {
        name: name.trim() || undefined,
        role: role.trim() || undefined,
      }).catch(() => {});
    }
    navigation.replace('MainTabs');
  };

  const currentAvatar = sampleAvatars[avatarIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <Text style={styles.logoDoc}>Doc</Text>
              <Text style={styles.logoConnect}>Connect</Text>
            </View>
          </View>

          {/* Body Section */}
          <View style={styles.content}>
            <View style={styles.topSection}>
              <Text style={styles.title}>Profile Information</Text>
              <Text style={styles.subtitle}>Tell us about yourself</Text>

              {/* Avatar Section */}
              <View style={styles.avatarSection}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleToggleAvatar}
                  style={styles.avatarWrapper}
                >
                  <View style={styles.avatarCircle}>
                    {currentAvatar ? (
                      <Image source={currentAvatar} style={styles.avatarImg} />
                    ) : (
                      <Svg width="110" height="110" viewBox="0 0 110 110">
                        <Circle cx="55" cy="55" r="55" fill="#A4A7AC" />
                        <Circle cx="55" cy="43" r="19" fill="#FFFFFF" />
                        <Path
                          d="M 20 100 C 22 75, 37 64, 55 64 C 73 64, 88 75, 90 100 Z"
                          fill="#FFFFFF"
                        />
                      </Svg>
                    )}
                  </View>

                  {/* Camera Badge */}
                  <View style={styles.cameraBadge}>
                    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M4 8H7L9 5H15L17 8H20C21.1 8 22 8.9 22 10V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V10C2 8.9 2.9 8 4 8Z"
                        stroke={COLORS.primary}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <Circle
                        cx="12"
                        cy="14.5"
                        r="3.5"
                        stroke={COLORS.primary}
                        strokeWidth="2.2"
                      />
                    </Svg>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Your Name Input */}
              <Text style={styles.label}>Your Name</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your first name"
                  placeholderTextColor="#7F7F80"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  cursorColor={COLORS.primary}
                  selectionColor={COLORS.primary}
                />
              </View>

              {/* Your Role Input */}
              <Text style={styles.label}>Your Role</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your role"
                  placeholderTextColor="#7F7F80"
                  value={role}
                  onChangeText={setRole}
                  autoCapitalize="words"
                  cursorColor={COLORS.primary}
                  selectionColor={COLORS.primary}
                />
              </View>
            </View>

            {/* Bottom Button */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.continueButton}
                activeOpacity={0.88}
                onPress={handleContinue}
              >
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoDoc: {
    fontSize: 22,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: '#29292B',
    letterSpacing: -0.3,
  },
  logoConnect: {
    fontSize: 22,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: -0.3,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: Platform.OS === 'ios' ? 24 : 32,
  },
  topSection: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: '#29292B',
    letterSpacing: -0.4,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    color: '#7F7F80',
    marginTop: 6,
    marginBottom: 32,
    lineHeight: 20,
    textAlign: 'left',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    width: 114,
    height: 114,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarCircle: {
    width: 114,
    height: 114,
    borderRadius: 57,
    backgroundColor: '#A4A7AC',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  avatarImg: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D8EEEE',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  label: {
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
    fontWeight: '500',
    color: '#29292B',
    marginBottom: 8,
    textAlign: 'left',
  },
  inputBox: {
    backgroundColor: '#EEF5F6',
    borderRadius: 14,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 15,
    fontFamily: 'DMSans_400Regular',
    color: '#29292B',
    textAlign: 'center',
    minWidth: 0,
    padding: 0,
    margin: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    height: 54,
    borderRadius: 27,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
  },
});

export default ProfileInformationScreen;
