export const PROFILE_IMAGES = {
  'Image': require('../../assets/profiles/Image.png'),
  'Image-1': require('../../assets/profiles/Image-1.png'),
  'Image-2': require('../../assets/profiles/Image-2.png'),
  'Image-3': require('../../assets/profiles/Image-3.png'),
  'Image-4': require('../../assets/profiles/Image-4.png'),
};

export const POST_IMAGES = {
  'create-post-image-1': require('../../assets/posts/create-post-image-1.png'),
  'create-post-image-1@2x': require('../../assets/posts/create-post-image-1.png'),
  'create-post-image-2': require('../../assets/posts/create-post-image-2.png'),
  'create-post-image-2@2x': require('../../assets/posts/create-post-image-2.png'),
  'create-post-image-3': require('../../assets/posts/create-post-image-3.png'),
  'create-post-image-3@2x': require('../../assets/posts/create-post-image-3.png'),
  'create-post-image-4': require('../../assets/posts/create-post-image-4.png'),
  'create-post-image-4@2x': require('../../assets/posts/create-post-image-4.png'),
  'create-post-image-5': require('../../assets/posts/create-post-image-5.png'),
  'create-post-image-5@2x': require('../../assets/posts/create-post-image-5.png'),
};

export const getProfileImage = (imageKey) => {
  if (imageKey && PROFILE_IMAGES[imageKey]) {
    return PROFILE_IMAGES[imageKey];
  }
  return PROFILE_IMAGES['Image'];
};

export const getPostImage = (imageKey) => {
  if (imageKey && POST_IMAGES[imageKey]) {
    return POST_IMAGES[imageKey];
  }
  return null;
};
