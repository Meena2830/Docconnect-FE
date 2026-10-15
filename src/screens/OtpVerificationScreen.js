import React, { useState, useRef, useEffect } from 'react';
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

const OTP_LENGTH = 6;

const OtpVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(29);
  const inputRefs = useRef([]);

  // 30s countdown timer
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 1) {
      // Handle paste
      const digits = cleaned.slice(0, OTP_LENGTH).split('');
      for (let i = 0; i < OTP_LENGTH; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = cleaned;
    setOtp(newOtp);

    // Auto-advance
    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(new Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    }
  };

  const handleVerify = () => {
    navigation.navigate('ProfileInformation');
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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
              <Text style={styles.title}>Verify your number</Text>
              <Text style={styles.subtitle}>
                We sent a 6-digit code to{' '}
                <Text style={styles.phoneHighlight}>+91</Text>
              </Text>

              {/* 6 OTP boxes evenly distributed with flex: 1 */}
              <View style={styles.otpRow}>
                {otp.map((digit, index) => (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      Boolean(digit) && styles.otpBoxFilled,
                    ]}
                  >
                    <TextInput
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      style={styles.otpInput}
                      keyboardType="number-pad"
                      maxLength={index === 0 ? OTP_LENGTH : 1}
                      value={digit}
                      onChangeText={(val) => handleOtpChange(val, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      selectTextOnFocus
                      autoFocus={index === 0}
                      cursorColor={COLORS.primary}
                      selectionColor={COLORS.primary}
                      textAlign="center"
                    />
                  </View>
                ))}
              </View>

              {/* Centered Resend Link */}
              <View style={styles.resendContainer}>
                {timer > 0 ? (
                  <Text style={styles.resendText}>
                    Resend code in {formatTimer(timer)}
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                    <Text style={styles.resendLink}>Resend code</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Bottom Button */}
            <View style={styles.bottomSection}>
              <TouchableOpacity
                style={styles.verifyButton}
                activeOpacity={0.88}
                onPress={handleVerify}
              >
                <Text style={styles.verifyText}>Verfiy</Text>
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
  phoneHighlight: {
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: '#29292B',
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
    marginBottom: 24,
  },
  otpBox: {
    flex: 1,
    minWidth: 0,
    height: 58,
    borderRadius: 14,
    backgroundColor: '#F0F1F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  otpBoxFilled: {
    backgroundColor: '#EBF6F6',
    borderColor: COLORS.primary,
  },
  otpInput: {
    fontSize: 20,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: '#29292B',
    width: '100%',
    height: '100%',
    minWidth: 0,
    padding: 0,
    margin: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  resendContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  resendText: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    color: '#7F7F80',
    textAlign: 'center',
  },
  resendLink: {
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  verifyButton: {
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
  verifyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
  },
});

export default OtpVerificationScreen;
