import axios from 'axios';
import { API_BASE_URL, CURRENT_USER_ID } from '../config/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Fetch current user profile details
 */
export const fetchCurrentUser = async (userId = CURRENT_USER_ID) => {
  try {
    const response = await apiClient.get('/users', {
      params: { currentUserId: userId },
    });
    return response.data;
  } catch (error) {
    console.error('API Error in fetchCurrentUser:', error?.message);
    throw error;
  }
};

/**
 * Fetch feed posts in descending order with author populated
 */
export const fetchPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    console.error('API Error in fetchPosts:', error?.message);
    throw error;
  }
};

/**
 * Fetch users for the Discover screen, excluding current user
 */
export const fetchDiscoverUsers = async (userId = CURRENT_USER_ID) => {
  try {
    const response = await apiClient.get('/users', {
      params: { currentUserId: userId, excludeCurrent: 'true' },
    });
    return response.data;
  } catch (error) {
    console.error('API Error in fetchDiscoverUsers:', error?.message);
    throw error;
  }
};

/**
 * Send a connection request to a target user
 */
export const sendConnectRequest = async (toUserId, fromUserId = CURRENT_USER_ID) => {
  try {
    const response = await apiClient.post('/connect', {
      fromUserId,
      toUserId,
    });
    return response.data;
  } catch (error) {
    // If request already exists (409), treat status as requested
    if (error?.response?.status === 409) {
      return {
        success: true,
        status: 'requested',
        message: 'Already requested',
        connectionRequest: error?.response?.data?.connectionRequest,
      };
    }
    console.error('API Error in sendConnectRequest:', error?.message);
    throw error;
  }
};

/**
 * Fetch IDs of all users requested by the current user
 */
export const fetchRequestedUserIds = async (userId = CURRENT_USER_ID) => {
  try {
    const response = await apiClient.get('/connect', {
      params: { fromUserId: userId },
    });
    return response.data.requestedUserIds || [];
  } catch (error) {
    console.error('API Error in fetchRequestedUserIds:', error?.message);
    return [];
  }
};

/**
 * Update current user's profile information
 */
export const updateUserProfile = async (userId = CURRENT_USER_ID, profileData = {}) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('API Error in updateUserProfile:', error?.message);
    return null;
  }
};

export default apiClient;
