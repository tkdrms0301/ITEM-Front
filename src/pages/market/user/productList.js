import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { Header } from "./header";
import { Box, Grid } from "@mui/material";
import ProductCard from "./component/ProductCard";
import { Container } from "@mui/system";

export const MarketProductsListPage = () => {
  const location = useLocation();
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setCategoryId(location.state.title); // 백에다가 카테고리 id 주고 상품 리스트 받아서
    setProductList([
      {
        id: 1,
        name: "프리플로우 ELITE 홈오피스 R5 A (8GB, SSD 250G)",
        comment:
          "AMD / 라이젠5 PRO-3세대 / 르누아르 / 4650G (3.7GHz) / (AMD) A520 / DDR4 / 8GB / SSD / 250GB / 라데온 그래픽스 7 / 1Gbps 유선 / 500W / 운영체제 미포함 / 미들타워 / 용도: 사무/인강용",
        cost: 1018900,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/176/314/img/19314176_1.jpg?shrink=130:130&_v=20230517163020",
      },
      {
        id: 2,
        name: "이엠텍 레드빗 PRO - I5M51 (16GB, M.2 512GB)",
        comment:
          "인텔 / 코어i5-12세대 / 엘더레이크 / i5-12400F (2.5GHz) / (인텔) H610 / DDR4 / 16GB / M.2 / 512GB / 지포스 RTX 3060 / 12GB / 7.1채널 / 1Gbps 유선 / HDMI / DP포트 / USB 3.0(5Gbps) / 600W / 운영체제 미포함 / 미들타워 / 용도: 게임용",
        cost: 1067190,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/599/980/img/19980599_1.jpg?shrink=130:130&_v=20230428164906",
      },
      {
        id: 3,
        name: "포유컴퓨터 퍼포먼스PC 32 i5 13400F RTX3060Ti (16GB, M.2 500GB)",
        comment:
          "인텔 / 코어i5-13세대 / 랩터레이크 / i5-13400F (2.5GHz) / (인텔) H610 / DDR5 / 16GB / M.2 / 500GB / 지포스 RTX 3060 Ti / 1Gbps 유선 / HDMI / DP포트 / 600W / 운영체제 미포함 / 미들타워 / 용도: 게임용",
        cost: 829830,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/944/936/img/18936944_1.jpg?shrink=130:130&_v=20230206143939",
      },
      {
        id: 4,
        name: "한성컴퓨터 프리워커 F5600",
        comment:
          "AMD / 라이젠5-5세대 / 라파엘 / 7600 (3.8GHz) / (AMD) A620 / DDR5 / 32GB / M.2 / 512GB / 지포스 RTX 3060 / 12GB / 1Gbps 유선 / HDMI / DP포트 / 800W / 운영체제 미포함 / 미들타워 / 용도: 게임용",
        cost: 1194060,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/484/546/img/13546484_1.jpg?shrink=130:130&_v=20230424160107",
      },
    ]);
    setCategoryName(location.state.title);
  }, []);

  return (
    <>
      {categoryName ? <Header title={categoryName}></Header> : null}
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
