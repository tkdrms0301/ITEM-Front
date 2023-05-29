import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Card, Grid, Typography } from "@mui/material";
import { ProductCarousel } from "./component/ProductCarousel";
import { CategoryCard } from "./component/CategoryCard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { topProductsData } from "./testdata";
import { MarketSearchBar } from "./component/SearchBar";

export const UserMarketMain = ({ color = "primary" }) => {
  const navigate = useNavigate();

  const [topProducts, setTopProducts] = useState(null);
  useEffect(() => {
    setTopProducts(topProductsData);
  }, []);

  return (
    <>
      <Grid
        container
        sx={{ mt: 0, mb: 3 }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="center"
        >
          <MarketSearchBar />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ width: "100%" }}
          display="flex"
          justifyContent="center"
        >
          <Card sx={{ width: "90%", p: 3, boxShadow: 10 }}>
            {topProducts !== null && (
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sx={{ width: "100%" }}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="h3" sx={{ mt: 1, mb: 1 }}>
                    이번주 가장 많이 팔린 상품은?
                  </Typography>
                </Grid>
                <ProductCarousel data={topProducts} />
              </Grid>
            )}
          </Card>
        </Grid>
        <Grid item container xs={12} width={"90%"} spacing={2}>
          <Grid item xs={8}>
            <Card
              onClick={() => {
                navigate("/market/mypage");
              }}
              sx={{
                width: "100%",
                height: "100%",
                p: 3,
                boxShadow: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StorefrontIcon sx={{ mr: 1, fontSize: 40 }} />
              <Typography variant="h4">마이페이지</Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              onClick={() => {
                navigate("/market/mypage/history");
              }}
              sx={{
                width: "100%",
                height: "100%",
                p: 1,
                boxShadow: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListAltIcon sx={{ mr: 1, fontSize: 40 }} />
              <Typography variant="h4">
                주문
                <br />
                목록
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid item container xs={12} width={"90%"} spacing={2}>
          <Grid item xs={6}>
            <CategoryCard
              category={1}
              title={"PC / PC부품"}
              image={
                "https://item0container.blob.core.windows.net/image/computer.webp"
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CategoryCard
              category={2}
              title={"노트북"}
              image={
                "https://item0container.blob.core.windows.net/image/noteBook.png"
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CategoryCard
              category={3}
              title={"스마트폰"}
              image={
                "https://item0container.blob.core.windows.net/image/smartPhone.png"
              }
            />
          </Grid>
          <Grid item xs={6}>
            <CategoryCard
              category={4}
              title={"태블릿PC"}
              image={
                "https://item0container.blob.core.windows.net/image/tablet.png"
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
