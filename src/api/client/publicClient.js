import axios from "axios";

const baseURL = "http://localhost:8000/api/v1";
// const baseURL  ="https://social-media-server-git-main-omar-alghaish.vercel.app/api/v1"
// const baseURL = "https://social-server-f36n.onrender.com/api/v1"
const publicClient = axios.create({
  baseURL,
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response;
  }
);

export default publicClient;
