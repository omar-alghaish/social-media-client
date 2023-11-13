import publicClient from "../client/publicClient";
import privateClient from "../client/privateClient";

const storyEndpoints = {
  create: "story/create",
  getUserPosts: (id) => `story/getstory/${id}`,
  friendsStories: "story/friendsStories",
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
      const response = await publicClient.get(
        storyEndpoints.postByHashtag(tag)
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default storyApi;
