import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Header } from "./header";
import { Box, Grid } from "@mui/material";
import ProductCard from "./component/ProductCard";
import { Container } from "@mui/system";
import { get } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";

export const MarketProductsListSearchPage = () => {
  const [productList, setProductList] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("search");

  useEffect(() => {
    get(BaseUrl + "/api/market/search?keyword=" + keyword)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header title={"검색 결과"}></Header>
      <Container>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(2, 1fr)",
            mt: 2,
          }}
        >
          {productList.map((productList, index) => (
            <Grid container key={index}>
              <Grid item xs={12}>
                <ProductCard product={productList} key={index}></ProductCard>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </>
  );
};
