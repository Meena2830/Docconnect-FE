import { Platform } from 'react-native';

// Development configuration
// Android emulator: http://10.0.2.2:5000/api
// iOS simulator:    http://localhost:5000/api
// Physical device:  http://10.73.121.52:5000/api
export const DEV_LAN_IP = '10.73.121.52';
export const PORT = 5000;

// Hardcoded current user ID matching the first seeded user record
export const CURRENT_USER_ID = '6697a1f0a1b2c3d4e5f60001';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${PORT}/api`;
  }
  return `http://localhost:${PORT}/api`;
};

export const API_BASE_URL = getBaseUrl();
