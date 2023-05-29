import { SellerMarketMain } from "./seller/market-main";
import { UserMarketMain } from "./user/market-main";

export const MarketMain = () => {
  return (
    <>
      {localStorage.getItem("user").roleType === "SELLER" ? (
        <SellerMarketMain />
      ) : (
        <UserMarketMain />
      )}
    </>
  );
};
