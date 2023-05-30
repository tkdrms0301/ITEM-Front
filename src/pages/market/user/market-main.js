import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Card, Grid, Typography } from "@mui/material";
import { ProductCarousel } from "./component/ProductCarousel";
import { CategoryCard } from "./component/CategoryCard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { MarketSearchBar } from "./component/SearchBar";

export const UserMarketMain = ({ color = "primary" }) => {
  const navigate = useNavigate();

  const categorys = [
    {
      id: 1,
      title: "PC / PC부품",
      image: "https://item0container.blob.core.windows.net/image/computer.webp",
    },
    {
      id: 2,
      title: "노트북",
      image: "https://item0container.blob.core.windows.net/image/noteBook.png",
    },
    {
      id: 3,
      title: "스마트폰",
      image:
        "https://item0container.blob.core.windows.net/image/smartPhone.png",
    },
    {
      id: 4,
      title: "태블릿PC",
      image: "https://item0container.blob.core.windows.net/image/tablet.png",
    },
  ];

  const [topProducts, setTopProducts] = useState(null);
  useEffect(() => {
    setTopProducts([
      {
        id: 1,
        cover: `/images/products/product_1.jpg`,
        name: "Nike Air Force 1 NDESTRUKT",
        price: 10000,
        status: "new",
      },
      {
        id: 2,
        cover: `/images/products/product_2.jpg`,
        name: "Nike Air Force 1 NDESTRUKT",
        price: 20000,
        status: "sale",
      },
      {
        id: 3,
        cover: `/images/products/product_3.jpg`,
        name: "Nike Air Force 1 NDESTRUKT",
        price: 40000,
        status: "sale",
      },
    ]);
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
                  <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                    이번주 가장 많이 팔린 상품은?
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ width: "100%" }}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <ProductCarousel data={topProducts} />
                </Grid>
              </Grid>
            )}
          </Card>
        </Grid>

        <Grid item container width={"90%"}>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {categorys.map((category, index) => (
              <CategoryCard
                key={index}
                category={category.id}
                title={category.title}
                image={category.image}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
