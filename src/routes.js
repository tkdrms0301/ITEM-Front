import { Home } from "./pages/home/home";
import { CommunityMain } from "./pages/community/community-main";
import { RepairMain } from "./pages/repair/repair-main";
import { MarketMain } from "./pages/market/market-main";
import { Login } from "./pages/common/login";
import { Sign } from "./pages/common/sign";
import { CommonMyPage } from "./pages/common/mypage/common-mypage";

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
