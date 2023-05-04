import { Home } from "./pages/home/home";
//import { CommunityMain } from "./pages/community/community-main";
//import { CommunityMyPage } from "./pages/community/community-mypage";
//import { SinglePostView } from "./pages/community/singlePostView";
import { RepairMain } from "./pages/repair/repair-main";
import { MarketMain } from "./pages/market/market-main";
import { Login } from "./pages/common/login";
import { Sign } from "./pages/common/sign/sign";
import { PostForm } from "./pages/community/postForm";
import { DataMain } from "./pages/data/data-main";
import { CommonMyPage } from "./pages/common/mypage/common-mypage";
import { PrivateRepairShopList } from "./pages/repair/AroundRepairShop/PrivateRepairShopList";
import { PrivateRepairShopDetail } from "./pages/repair/AroundRepairShop/PrivateRepairShopDetail.js";
import { PublicRepairShopList } from "./pages/repair/AroundRepairShop/PublicRepairShopList";
import { PublicRepairShopDetail } from "./pages/repair/AroundRepairShop/PublicRepairShopDetail.js";
import { ReportResult } from "./pages/repair/report/ReportResult";
import DeviceManagement from "./pages/common/device-management/index.js";

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
  // {
  //   path: "/community",
  //   element: <CommunityMain />,
  // },
  // {
  //   path: "/community",
  //   element: <CommunityMain />,
  // },
  // {
  //   path: "/community/mypage/:userid",
  //   element: <CommunityMyPage />,
  // },
  // {
  //   path: "/community/post/:postid",
  //   element: <SinglePostView />,
  // },
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
    path: "/repair/privateShops/detail",
    element: <PrivateRepairShopDetail />,
  },
  {
    path: "/repair/publicShops",
    element: <PublicRepairShopList />,
  },
  {
    path: "/repair/publicShops/detail",
    element: <PublicRepairShopDetail />,
  },
  {
    path: "/repair/readReport",
    element: <ReportResult isRegist={false} />,
  },
  {
    path: "/repair/registReport",
    element: <ReportResult isRegist={true} />,
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
];
