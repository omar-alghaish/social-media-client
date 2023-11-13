import publicClient from "../client/publicClient";
import privateClient from "../client/privateClient";

const storyEndpoints = {
  create: "story/create",
  getUserPosts: (id) => `story/getstory/${id}`,
  likePost: "story/like",
  makeComment: "story/comment",
  friendsStories:"story/friendsStories",
  postByHashtag: (tag) => `story/tags/${tag}`,
  reactPost:(postId)=> `story/${postId}/react`

};

const storyApi = {
  createStory: async (values) => {
    try {
      const response = await privateClient.post(storyEndpoints.create, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getUserPosts: async (id) => {
    try {
      const response = await publicClient.get(storyEndpoints.getUserPosts(id));

      return { response };
    } catch (error) {
      return { error };
    }
  },
  likePost: async (values) => {
    try {
      const response = await privateClient.post(storyEndpoints.likePost, values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  makeComment: async (values) => {
    try {
      const response = await privateClient.post(storyEndpoints.makeComment, values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getFriendsStories: async () => {
    try {
      const response = await privateClient.get(storyEndpoints.friendsStories);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getPostsByHashtag: async (tag) => {
    try {
      const response = await publicClient.get(storyEndpoints.postByHashtag(tag));

      return { response };
    } catch (error) {
      return { error };
    }
  },
  reactPost: async (values, postId)=>{
    try {
      const response = await privateClient.post(storyEndpoints.reactPost(postId), values);

      return { response };
    } catch (error) {
      return { error };
    }
  }
};

export default storyApi;
