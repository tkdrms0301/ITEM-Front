import { Home } from "./pages/home/home";
import { CommonMyPage } from "./pages/common/common-mypage";
import { CommunityMain } from "./pages/community/community-main";
import { CommunityMyPage } from "./pages/community/community-mypage";
import { SinglePostView } from "./pages/community/singlePostView";
import { RepairMain } from "./pages/repair/repair-main";
import { MarketMain } from "./pages/market/market-main";
import { PostForm } from "./pages/community/postForm";
import { DataMain } from "./pages/data/data-main";
import { Login } from "./pages/common/login";
import { Sign } from "./pages/common/sign";
export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mypage",
    element: <CommonMyPage />,
  },
  {
    path: "/community",
    element: <CommunityMain />,
  },
  {
    path: "/community/mypage/:userid",
    element: <CommunityMyPage />,
  },
  {
    path: "/community/post/:postid",
    element: <SinglePostView />,
  },
  {
    path: "/community/post/:postid/update",
    element: <PostForm />,
  },
  {
    path: "/community/newpost",
    element: <PostForm />,
  },
  {
    path: "/repair",
    element: <RepairMain />,
  },
  {
    path: "/market",
    element: <MarketMain />,
  },
  {
    path: "/data",
    element: <DataMain />,
    
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign",
    element: <Sign />,
  },
];
