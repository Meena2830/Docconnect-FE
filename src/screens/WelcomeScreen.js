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
} from 'react-native';
import { COLORS } from '../theme/colors';

const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetStarted = () => {
    navigation.navigate('OtpVerification', { phoneNumber });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {/* Centered DocConnect Branding Header */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <Text style={styles.logoDoc}>Doc</Text>
              <Text style={styles.logoConnect}>Connect</Text>
            </View>
          </View>

          {/* Screen Content Wrapper */}
          <View style={styles.screenWrapper}>
            <View style={styles.mainContainer}>
              {/* Top Section */}
              <View style={styles.topSection}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>
                  Sign in to connect with healthcare professionals
                </Text>

                <Text style={styles.inputLabel}>Mobile number</Text>

                <View style={styles.inputRow}>
                  {/* Country Code Pill */}
                  <View style={styles.countryCodeBox}>
                    <Text style={styles.flagEmoji}>🇮🇳</Text>
                    <Text style={styles.countryCodeText}>+91</Text>
                  </View>

                  {/* Phone Input Box */}
                  <View style={styles.phoneInputBox}>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Enter your number"
                      placeholderTextColor="#9EA0A5"
                      keyboardType="phone-pad"
                      maxLength={10}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                    />
                  </View>
                </View>
              </View>

              {/* Bottom Actions Section */}
              <View style={styles.bottomSection}>
                <Text style={styles.termsText}>
                  By continuing, you agree to Docconnect's{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>

                <TouchableOpacity
                  style={styles.getStartedButton}
                  activeOpacity={0.88}
                  onPress={handleGetStarted}
                >
                  <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
              </View>
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
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
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
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
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
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    color: '#7F7F80',
    marginTop: 6,
    marginBottom: 32,
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
    fontWeight: '500',
    color: '#29292B',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F1F3',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 14,
    gap: 6,
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
    fontWeight: '500',
    color: '#29292B',
  },
  phoneInputBox: {
    flex: 1,
    backgroundColor: '#F0F1F3',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  phoneInput: {
    fontSize: 15,
    fontFamily: 'DMSans_400Regular',
    color: '#29292B',
    height: '100%',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    color: '#7F7F80',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  termsLink: {
    color: '#7F7F80',
    textDecorationLine: 'underline',
  },
  getStartedButton: {
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
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
  },
});

export default WelcomeScreen;
