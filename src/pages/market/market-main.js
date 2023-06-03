import { SellerMarketMain } from "./seller/market-main";
import { UserMarketMain } from "./user/market-main";

export const MarketMain = () => {
  const token = localStorage.getItem("user");

  return (
    <>
      {token !== null && token.roleType === "SELLER" ? (
        <SellerMarketMain />
      ) : (
        <UserMarketMain />
      )}
    </>
  );
};
