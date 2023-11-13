import publicClient from "../client/publicClient";
import privateClient from "../client/privateClient";

const postEndpoints = {
  create: "posts/create",
  getUserPosts: (id) => `posts/getPosts/${id}`,
  likePost: "posts/like",
  makeComment: "posts/comment",
  friendsPosts:"posts/friendsPosts",
  postByHashtag: (tag) => `posts/tags/${tag}`,
  reactPost:(postId)=> `posts/${postId}/react`,
  singlePost:(postId)=>`posts/post/${postId}`

};

const postApi = {
  createPost: async (values) => {
    try {
      const response = await privateClient.post(postEndpoints.create, values, {
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
      const response = await publicClient.get(postEndpoints.getUserPosts(id));

      return { response };
    } catch (error) {
      return { error };
    }
  },
  likePost: async (values) => {
    try {
      const response = await privateClient.post(postEndpoints.likePost, values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  makeComment: async (values) => {
    try {
      const response = await privateClient.post(postEndpoints.makeComment, values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getFriendsPosts: async (id) => {
    try {
      const response = await privateClient.get(postEndpoints.friendsPosts);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getPostsByHashtag: async (tag) => {
    try {
      const response = await publicClient.get(postEndpoints.postByHashtag(tag));

      return { response };
    } catch (error) {
      return { error };
    }
  },
  reactPost: async (values, postId)=>{
    try {
      const response = await privateClient.post(postEndpoints.reactPost(postId), values);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getSinglePost: async (postId) => {
    try {
      const response = await publicClient.get(postEndpoints.singlePost(postId));

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default postApi;
