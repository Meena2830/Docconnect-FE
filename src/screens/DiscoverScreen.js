import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../theme/colors';
import UserCard from '../components/UserCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { SearchOutlineIcon } from '../components/Icons';
import { fetchDiscoverUsers, sendConnectRequest } from '../services/api';

const DiscoverScreen = () => {
  const [users, setUsers] = useState([]);
  const [requestedUserIds, setRequestedUserIds] = useState(new Set());
  const [connectingUserId, setConnectingUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMessage(null);

    try {
      const data = await fetchDiscoverUsers();
      if (data?.users) {
        setUsers(data.users);
      }
      if (data?.requestedUserIds) {
        setRequestedUserIds(new Set(data.requestedUserIds));
      }
    } catch (error) {
      console.error('DiscoverScreen load error:', error);
      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to load suggested connections. Please retry.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Fetch requested-user IDs whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadData(false);
    }, [loadData])
  );

  const handleConnect = async (toUserId) => {
    if (requestedUserIds.has(toUserId)) return;

    setConnectingUserId(toUserId);

    try {
      const result = await sendConnectRequest(toUserId);
      if (result.success || result.status === 'requested') {
        // Optimistically and deterministically update requested state
        setRequestedUserIds((prev) => new Set([...prev, toUserId]));
      }
    } catch (error) {
      console.error('Connection request failed:', error);
      Alert.alert(
        'Request Failed',
        error?.response?.data?.message || 'Could not send connection request. Please try again.'
      );
    } finally {
      setConnectingUserId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.occupation.toLowerCase().includes(query)
    );
  });

  if (isLoading && !isRefreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <LoadingView message="Finding healthcare professionals..." />
      </SafeAreaView>
    );
  }

  if (errorMessage && !isRefreshing && users.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <ErrorView message={errorMessage} onRetry={() => loadData(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Search Bar Header */}
      <View style={styles.headerContainer}>
        <View style={styles.searchBar}>
          <SearchOutlineIcon size={22} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search profiles, organizations..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>People you may know</Text>
          </View>
        }
        renderItem={({ item }) => (
          <UserCard
            user={item}
            isRequested={requestedUserIds.has(item._id)}
            isConnecting={connectingUserId === item._id}
            onConnect={handleConnect}
          />
        )}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadData(true)}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    color: COLORS.textPrimary,
    height: '100%',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  listContent: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default DiscoverScreen;
