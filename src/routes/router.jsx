import FriendsRequestList from "../components/common/FriendsRequestList";
import PostsByHashtag from "../components/common/PostsByHashtag";
import ProtectedPage from "../components/common/ProtectedPage";
import Real from "../components/common/Real";
import ForgetPassword from "../pages/ForgetPassword";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Reals from "../pages/Reals";
import Search from "../pages/Search";
import Signin from "../pages/Signin";
import PostPage from "../pages/PostPage";

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};

const routes = [
  {
    index: true,
    element: <Home />,
    state: "home",
  },
  {
    path: "/search",
    element: <Search />,
    state: "search",
  },
  {
    path: "/users/:id",
    element: (
      <ProtectedPage>
        <Profile />
      </ProtectedPage>
    ),
    state: "profile",
  },
  {
    path: "/post/:id",
    element: <PostPage />,
    state: "post",
  },
  {
    path: "/posts/tags/:tag",
    element: <PostsByHashtag />,
    state: "postsByHashtag",
  },
  {
    path: "/notifications",
    element: <Notifications />,
    state: "notifications",
  },
  {
    path: "/forgetpassword",
    element: <ForgetPassword />,
    state: "forgetpassword",
  },
  {
    path: "/signin",
    element: <Signin />,
    state: "signin",
  },
  {
    path: "/friendrequests",
    element: <FriendsRequestList />,
    state: "friendrequests",
  },
  {
    path: "/reals",
    element: <Reals />,
  },
];

export default routes;
