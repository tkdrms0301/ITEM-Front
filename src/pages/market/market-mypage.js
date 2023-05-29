import { UserMarketMypage } from "./user/market-mypage";

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
