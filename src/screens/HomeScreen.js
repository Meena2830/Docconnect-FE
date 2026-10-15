import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS } from '../theme/colors';
import Header from '../components/Header';
import ProfileHeader from '../components/ProfileHeader';
import PostCard from '../components/PostCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { fetchCurrentUser, fetchPosts } from '../services/api';

const HomeScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
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
      const [userData, postsData] = await Promise.all([
        fetchCurrentUser(),
        fetchPosts(),
      ]);

      if (userData?.currentUser) {
        setCurrentUser(userData.currentUser);
      }
      if (postsData?.posts) {
        setPosts(postsData.posts);
      }
    } catch (error) {
      console.error('HomeScreen load error:', error);
      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to load Home feed. Please check your connection and retry.'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading && !isRefreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Header />
        <LoadingView message="Loading your DocConnect feed..." />
      </SafeAreaView>
    );
  }

  if (errorMessage && !isRefreshing && posts.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Header />
        <ErrorView message={errorMessage} onRetry={() => loadData(false)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header />
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListHeaderComponent={<ProfileHeader user={currentUser} />}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    backgroundColor: COLORS.backgroundLight,
    paddingBottom: 24,
  },
});

export default HomeScreen;
