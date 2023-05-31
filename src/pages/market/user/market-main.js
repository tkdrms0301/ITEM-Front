import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Card, Grid, Typography } from "@mui/material";
import { ProductCarousel } from "./component/ProductCarousel";
import { CategoryCard } from "./component/CategoryCard";
import { MarketSearchBar } from "./component/SearchBar";
import { get } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";
import { set } from "lodash";

export const UserMarketMain = ({ color = "primary" }) => {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);

  const [topProducts, setTopProducts] = useState(null);
  useEffect(() => {
    get(BaseUrl + "/api/market/category")
      .then((res) => {
        setCategorys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setTopProducts([
      {
        id: 1,
        name: "프리플로우 ELITE 홈오피스 R5 A (8GB, SSD 250G)",
        comment:
          "AMD / 라이젠5 PRO-3세대 / 르누아르 / 4650G (3.7GHz) / (AMD) A520 / DDR4 / 8GB / SSD / 250GB / 라데온 그래픽스 7 / 1Gbps 유선 / 500W / 운영체제 미포함 / 미들타워 / 용도: 사무/인강용",
        price: 1018900,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/176/314/img/19314176_1.jpg?shrink=130:130&_v=20230517163020",
      },
      {
        id: 2,
        name: "이엠텍 레드빗 PRO - I5M51 (16GB, M.2 512GB)",
        comment:
          "인텔 / 코어i5-12세대 / 엘더레이크 / i5-12400F (2.5GHz) / (인텔) H610 / DDR4 / 16GB / M.2 / 512GB / 지포스 RTX 3060 / 12GB / 7.1채널 / 1Gbps 유선 / HDMI / DP포트 / USB 3.0(5Gbps) / 600W / 운영체제 미포함 / 미들타워 / 용도: 게임용",
        price: 1067190,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/599/980/img/19980599_1.jpg?shrink=130:130&_v=20230428164906",
      },
      {
        id: 3,
        name: "포유컴퓨터 퍼포먼스PC 32 i5 13400F RTX3060Ti (16GB, M.2 500GB)",
        comment:
          "인텔 / 코어i5-13세대 / 랩터레이크 / i5-13400F (2.5GHz) / (인텔) H610 / DDR5 / 16GB / M.2 / 500GB / 지포스 RTX 3060 Ti / 1Gbps 유선 / HDMI / DP포트 / 600W / 운영체제 미포함 / 미들타워 / 용도: 게임용",
        price: 829830,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/944/936/img/18936944_1.jpg?shrink=130:130&_v=20230206143939",
      },
      {
        id: 4,
        name: "한성컴퓨터 프리워커 F5600",
        comment:
          "AMD / 라이젠5-5세대 / 라파엘 / 7600 (3.8GHz) / (AMD) A620 / DDR5 / 32GB / M.2 / 512GB / 지포스 RTX 3060 / 12GB / 1Gbps 유선 / HDMI / DP포트 / 800W / 운영체제 미포함 / 미들타워 / 용도: 게임용",
        price: 1194060,
        thumbnailUrl:
          "https://img.danawa.com/prod_img/500000/484/546/img/13546484_1.jpg?shrink=130:130&_v=20230424160107",
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
                    이번 달 인기 상품을 확인해보세요!
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
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {categorys.map((category, index) => (
              <CategoryCard
                onClick={() => {
                  navigate(`/market/products`);
                }}
                key={index}
                categoryId={category.id}
                name={category.name}
                url={category.url}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
