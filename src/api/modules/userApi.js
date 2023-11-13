import publicClient from "../client/publicClient";
import privateClient from "../client/privateClient";

const userEndpoints = {
  signin: "login",
  signup: "signup",
  forgetPassword: "forgetPassword",
  verfiyResetCode: "verifyResetCode",
  changeForgetPassword: "resetPassword",
  getUser: (id) => `users/${id}`,
  getInfo: "info",
  searchUsers: "users",
  addFriend: "users/addFriend",
  acceptFriend:"users/acceptFriend",
  follow:"users/follow",
  friendRequests:"users/friendRequests"
};

const userApi = {
  signUp: async (values) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  signin: async (values) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  forgetPassword: async (values) => {
    try {
      const response = await publicClient.post(
        userEndpoints.forgetPassword,
        values
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
  verfiyResetCode: async (values) => {
    try {
      const response = await publicClient.post(
        userEndpoints.verfiyResetCode,
        values
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
  changeForgetPassword: async (values) => {
    try {
      const response = await publicClient.put(
        userEndpoints.changeForgetPassword,
        values
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getUser: async (id) => {
    try {
      const response = await privateClient.get(userEndpoints.getUser(id));
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getFriendRequests: async () => {
    try {
      const response = await privateClient.get(userEndpoints.friendRequests);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  search: async (keyword) => {
    try {
      const response = await publicClient.get(userEndpoints.searchUsers, {
        params: {
          keyword: keyword,
        },
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  addFriend:async (values) => {
    try {
      const response = await privateClient.post(userEndpoints.addFriend, values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  acceptFriend:async (values) => {
    try {
      const response = await privateClient.post(userEndpoints.acceptFriend,values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  follow:async (values) => {
    try {
      const response = await privateClient.post(userEndpoints.follow,values);
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
