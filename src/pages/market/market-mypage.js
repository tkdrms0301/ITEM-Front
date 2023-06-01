
import { UserMarketMypage } from "./user/mypage/market-mypage";

export const MarketMyPage = () => {
  return (
    <>
      {localStorage.getItem("user").roleType === "SELLER" ? (
        <UserMarketMypage />
      ) : (
        <UserMarketMypage />
      )}
    </>
  );
};
