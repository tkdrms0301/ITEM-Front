import { Home } from "./pages/home/home";
import { CommonMyPage } from "./pages/common/common-mypage";
import { CommunityMain } from "./pages/community/community-main";
import { RepairMain } from "./pages/repair/repair-main";
import { MarketMain } from "./pages/market/market-main";
import { Login } from "./pages/common/login";
import { Sign } from "./pages/common/sign";
import { PrivateRepairShopList } from "./pages/repair/PrivateRepairShopList";
import { PrivateRepairShopDetail } from "./pages/repair/PrivateRepairShopDetail.js";
import { PublicRepairShopList } from "./pages/repair/PublicRepairShopList";
import { PublicRepairShopDetail } from "./pages/repair/PublicRepairShopDetail.js";

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
];
