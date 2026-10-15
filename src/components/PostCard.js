import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';
import { getProfileImage, getPostImage } from '../assets/images';
import { HeartOutlineIcon, SendOutlineIcon } from './Icons';

const PostCard = ({ post }) => {
  if (!post) return null;

  const author = post.author || {};
  const authorAvatar = getProfileImage(author.profileImage);
  const postImage = getPostImage(post.image);

  const [likes, setLikes] = useState(post.likesCount || 5);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <View style={styles.card}>
      {/* Author Header */}
      <View style={styles.authorRow}>
        <View style={styles.avatarWrapper}>
          <Image
            source={authorAvatar}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName} numberOfLines={1}>
            {author.name || 'Docconnect'}
          </Text>
          <Text style={styles.authorOccupation} numberOfLines={1}>
            {author.occupation || 'Healthcare Professional'}
          </Text>
        </View>
      </View>

      {/* Post Text Content */}
      {Boolean(post.content) && (
        <Text style={styles.content}>{post.content}</Text>
      )}

      {/* Supplied Post Image */}
      {Boolean(postImage) && (
        <View style={styles.imageContainer}>
          <Image
            source={postImage}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Card Actions Footer */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <HeartOutlineIcon
            size={24}
            color={isLiked ? '#E53E3E' : COLORS.textSecondary}
          />
          <Text
            style={[
              styles.actionCount,
              isLiked && { color: '#E53E3E', fontWeight: '700' },
            ]}
          >
            {likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <SendOutlineIcon size={24} color={COLORS.textSecondary} />
          <Text style={styles.actionCount}>{post.sharesCount || 3}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  authorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  authorOccupation: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  content: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    lineHeight: 20,
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  imageContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.backgroundLight,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 8,
  },
  actionCount: {
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});

export default PostCard;
