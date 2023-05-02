import { Home } from "./pages/home/home";
import { CommunityMain } from "./pages/community/community-main";
import { CommunityMyPage } from "./pages/community/community-mypage";
import { SearchResult } from "./pages/community/searchResult";
import { SinglePostView } from "./pages/community/singlePostView";
import { RepairMain } from "./pages/repair/repair-main";
import { MarketMain } from "./pages/market/market-main";
import { Login } from "./pages/common/login";
import { Sign } from "./pages/common/sign/sign";
import { PostForm } from "./pages/community/postForm";
import { DataMain } from "./pages/data/data-main";
import { CommonMyPage } from "./pages/common/mypage/common-mypage";
import { PrivateRepairShopList } from "./pages/repair/PrivateRepairShopList";
import { PrivateRepairShopDetail } from "./pages/repair/PrivateRepairShopDetail.js";
import { PublicRepairShopList } from "./pages/repair/PublicRepairShopList";
import { PublicRepairShopDetail } from "./pages/repair/PublicRepairShopDetail.js";
import DeviceManagement from "./pages/common/device-management/index.js";
import { Reservation } from "./pages/repair/user/reservation";
import { PointHistory } from "./pages/common/mypage/pointHistory/pointHistory";

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
    path: "/mypage/device",
    element: <DeviceManagement />,
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
    path: "/community/search",
    element: <SearchResult />,
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
    path: "/repair/privateShops",
    element: <PrivateRepairShopList />,
  },
  {
    path: "/repair/privateShops/:repairShopId",
    element: <PrivateRepairShopDetail />,
  },
  {
    path: "/repair/publicShops",
    element: <PublicRepairShopList />,
  },
  {
    path: "/repair/privateShops/:repairShopId/reservation",
    element: <Reservation />,
  },
  {
    path: "/repair/publicShops/:repairShopId",
    element: <PublicRepairShopDetail />,
  },
  {
    path: "/market",
    element: <MarketMain />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign",
    element: <Sign />,
  },
  {
    path: "/data",
    element: <DataMain />,
  },
  {
    path: "/point/history",
    element: <PointHistory />,
  },
];
