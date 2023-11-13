import privateClient from "../client/privateClient";

const notificationEndpoints = {
  getNotification: "notification",
};

const notificationApi = {
  getNotification: async (page) => {
    try {
      const response = await privateClient.get(
        notificationEndpoints.getNotification,
        {
          params: { page: page },
        }
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default notificationApi;
