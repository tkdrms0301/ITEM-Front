import { Badge, Card } from "@mui/material";
import { SearchBar } from "../../../community/component/searchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MarketSearchBar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(4);
  }, []);

  return (
    <Card
      sx={{
        width: "90%",
        p: 3,
        boxShadow: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SearchBar url={"/market/products/search"} />
      <Badge badgeContent={cartCount} color="secondary">
        <ShoppingCartIcon
          sx={{ fontSize: 40, ml: 1 }}
          onClick={() => {
            navigate("/market/mypage/cart");
          }}
        />
      </Badge>
    </Card>
  );
};
