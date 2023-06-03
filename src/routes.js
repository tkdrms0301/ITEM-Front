import { Home } from "./pages/home/home";
import { CommunityMain } from "./pages/community/community-main";
import { CommunityMyPage } from "./pages/community/community-mypage";
import { SearchResult } from "./pages/community/searchResult";
import { SinglePostView } from "./pages/community/singlePostView";
import { RepairMain } from "./pages/repair/repair-main";
import { MarketMain } from "./pages/market/market-main";
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
import { Reservation } from "./pages/repair/reservation/reservation";
import { PointHistory } from "./pages/common/mypage/pointHistory/pointHistory";
import { Estimate } from "./pages/repair/estimate/estimate";
import { ReservationHistory } from "./pages/repair/reservation/history";
import { ReservationHistoryDetail } from "./pages/repair/reservation/historyDetail";
import { Login } from "./pages/common/login/login";
import { InfoUpdate } from "./pages/common/info-update/infoUpdate";
import { EstimateHistory } from "./pages/repair/estimate/history";
import { EstimateHistoryDetail } from "./pages/repair/estimate/historyDetail";
import { RepairShopMyPage } from "./pages/common/mypage/repairMyPage/repairShopMyPage";
import { IncomeMain } from "./pages/common/mypage/incomeMonitor/incomeMain";
import { ServiceListPanelMain } from "./pages/common/mypage/serviceListManagement/serviceListPanelMain";
import { ServiceListAddMain } from "./pages/common/mypage/serviceListManagement/serviceListAddMain";
import { ServiceListUpdateMain } from "./pages/common/mypage/serviceListManagement/serviceListUpdateMain";
import { RechargeMain } from "./pages/common/recharge/rechargeMain";
import { DexMain } from "./pages/common/dex/dexMain";
import { SubscriptionMain } from "./pages/common/subscription/subscriptionMain";
import { MarketMyPage } from "./pages/market/market-mypage";
import { OrderHistoryPage } from "./pages/market/user/mypage/orderHistory";
import { CartPage } from "./pages/market/user/mypage/cart";
import { OrderPage } from "./pages/market/user/mypage/order";
import { MarketProductsListPage } from "./pages/market/user/productList";
import { MarketProductPage } from "./pages/market/user/product";
import { HistoryDetailPage } from "./pages/market/user/mypage/hitoryDetail";
import { MarketProductsListSearchPage } from "./pages/market/user/searchProductList";

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
    path: "/community/mypage",
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
    path: "/repair/privateShops/detail",
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
    path: "/repair/privateShops/:repairShopId/update/:reservationId",
    element: <Reservation />,
  },
  {
    path: "/repair/mypage/reservation",
    element: <ReservationHistory />,
  },
  {
    path: "/repair/mypage/reservation/:reservationId",
    element: <ReservationHistoryDetail />,
  },
  {
    path: "/repair/privateShops/:repairShopId/estimate",
    element: <Estimate />,
  },
  {
    path: "/repair/mypage/estimate",
    element: <EstimateHistory />,
  },
  {
    path: "/repair/mypage/estimate/:estimateId",
    element: <EstimateHistoryDetail />,
  },
  {
    path: "/repair/publicShops/:repairShopId",
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
    path: "/market/products",
    element: <MarketProductsListPage />,
  },
  {
    path: "/market/product/:productId",
    element: <MarketProductPage />,
  },
  {
    path: "/market/products/search",
    element: <MarketProductsListSearchPage />,
  },
  {
    path: "/market/mypage",
    element: <MarketMyPage />,
  },
  {
    path: "/market/mypage/history",
    element: <OrderHistoryPage />,
  },
  {
    path: "/market/mypage/history/detail",
    element: <HistoryDetailPage />,
  },
  {
    path: "/market/mypage/cart",
    element: <CartPage />,
  },
  {
    path: "/market/mypage/order",
    element: <OrderPage />,
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
    path: "/mypage/point/history",
    element: <PointHistory />,
  },
  {
    path: "/mypage/point/rechargeMain",
    element: <RechargeMain />,
  },
  {
    path: "/mypage/point/dex",
    element: <DexMain />,
  },
  {
    path: "/mypage/subscription",
    element: <SubscriptionMain />,
  },
  {
    path: "/mypage/user/infoUpdate",
    element: <InfoUpdate />,
  },
  {
    path: "/mypage/repair",
    element: <RepairShopMyPage />,
  },
  {
    path: "/mypage/incomeMonitor",
    element: <IncomeMain />,
  },
  {
    path: "/mypage/serviceList/panel",
    element: <ServiceListPanelMain />,
  },
  {
    path: "/mypage/serviceList/add",
    element: <ServiceListAddMain />,
  },
  {
    path: "/mypage/serviceList/update",
    element: <ServiceListUpdateMain />,
  },
];
