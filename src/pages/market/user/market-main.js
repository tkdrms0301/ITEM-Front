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
      name: "컴퓨터",
      url: "https://img.danawa.com/prod_img/500000/599/980/img/19980599_1.jpg?shrink=130:130&_v=20230428164906",
    },
    {
      id: 2,
      name: "노트북",
      url: "https://img.danawa.com/prod_img/500000/928/239/img/20239928_1.jpg?shrink=130:130&_v=20230519101342",
    },
    {
      id: 3,
      name: "휴대폰",
      url: "https://img.danawa.com/prod_img/500000/509/881/img/19881509_1.jpg?shrink=130:130&_v=20230421104052",
    },
    {
      id: 4,
      name: "태블릿",
      url: "https://img.danawa.com/prod_img/500000/217/246/img/16246217_1.jpg?shrink=360:360&_v=20230523091158",
    },
    {
      id: 5,
      name: "그래픽카드",
      url: "https://img.danawa.com/prod_img/500000/271/719/img/14719271_1.jpg?shrink=130:130&_v=20210728125309",
    },
    {
      id: 6,
      name: "cpu",
      url: "https://img.danawa.com/prod_img/500000/808/627/img/19627808_1.jpg?shrink=130:130&_v=20230502094419",
    },
    {
      id: 7,
      name: "프린터기",
      url: "https://ads-partners.coupang.com/image1/QRyIESPc2iA99eXnQRoEK-5rQGtPAX97Q3nDm6iOf7WETsIHbF_GLKAzrhvGpR-c1E436NbBrw_L0BCNtPWt93vckxmXm-3z9FOmvdybCD29pBsSRcBP-4Pn9TNzaQpU6nDCKGpl3ifl1yZrDAXw5RngcS1-lZfo6MG7pDEZul01tlpx9MdIi-5BVSAiQObWewDkmkPnhUJ_JPBniiryZUOkg5Mg1VT7fH9zJmpzDAoVEfRpp6fzVgII1xondzhkjlvX_dGBagjxMp8=",
    },
    {
      id: 8,
      name: "RAM",
      url: "https://ads-partners.coupang.com/image1/byFNg1VqZO9mne5vb4mH4fXA0XH0xbt_bmJR_qDhpHf33s7IUU13eKau9O4PgaIqePZIrParsj_nQMKbyypaTAc4vYsXLin243j2zOOzNhPtirCu6sNNNgsKHcDdwjtqMNyfR7_u4ERAGhTsoIw5IuvI3Ax67XKUAvaIBiuxJu1sHqQB6RXxQav89MaJfTSriVbZMM1KsP-NPHkjIClYmDjao3yms2yRArqskPd7OxPPP7_xUQ9g9Ae-a4NmkOzf-cLfG0-QzlouvqRN5IeIPFChJxOKwkIXTFmw",
    },
    {
      id: 9,
      name: "SSD",
      url: "https://img.danawa.com/prod_img/500000/038/706/img/17706038_1.jpg?shrink=130:130&_v=20230216130422",
    },
    {
      id: 10,
      name: "HDD",
      url: "https://img.danawa.com/prod_img/500000/761/765/img/15765761_1.jpg?shrink=130:130&_v=20211206151137",
    },
    {
      id: 11,
      name: "파워",
      url: "https://img.danawa.com/prod_img/500000/200/174/img/10174200_1.jpg?shrink=130:130&_v=20230519102751",
    },
    {
      id: 12,
      name: "쿨러",
      url: "https://img.danawa.com/prod_img/500000/538/221/img/17221538_1.jpg?shrink=130:130&_v=20220701140154",
    },
    {
      id: 13,
      name: "키보드",
      url: "https://img.danawa.com/prod_img/500000/720/062/img/10062720_1.jpg?shrink=130:130&_v=20230216165115",
    },
    {
      id: 14,
      name: "NAS",
      url: "https://img.danawa.com/prod_img/500000/504/349/img/11349504_1.jpg?shrink=130:130&_v=20210412140952",
    },
    {
      id: 15,
      name: "USB",
      url: "https://img.danawa.com/prod_img/500000/516/507/img/9507516_1.jpg?shrink=130:130&_v=20200409152930",
    },
    {
      id: 16,
      name: "공유기",
      url: "https://img.danawa.com/prod_img/500000/372/814/img/19814372_1.jpg?shrink=130:130&_v=20230417163710",
    },
    {
      id: 17,
      name: "USB허브",
      url: "https://img.danawa.com/prod_img/500000/778/100/img/8100778_1.jpg?shrink=130:130&_v=20230120090654",
    },
    {
      id: 18,
      name: "랜카드",
      url: "https://ads-partners.coupang.com/image1/56A5A1xTfi8EdvXI59-nKajf8SAAIMnuBkIojWQxfUdeFcxZ2x5YUKK7CDuM2QBqmt1IHMkY3kPrHp9zomE4PQfs31-44psdsKQ9XLoYbkpc6kk2cruMH1iR-0NaUNeVFh4Tob6UvFeT4frJl1bhH7lEoAbwmyt6_-Pf2ySELda3DxbMSgity12Z_dwwP2554fE2-imqT6PqOWNqh46Qjev61--hw6HRsjCRKBJ6Vt3iC54me1zjOH2pdqXv9J-7Wc3jwYkIm4-S",
    },
    {
      id: 19,
      name: "스위치허브",
      url: "https://img.danawa.com/prod_img/500000/743/300/img/15300743_1.jpg?shrink=130:130&_v=20220221152950",
    },
    {
      id: 20,
      name: "모니터",
      url: "https://img.danawa.com/prod_img/500000/501/355/img/13355501_1.jpg?shrink=130:130&_v=20230417145222",
    },
    {
      id: 21,
      name: "메인보드",
      url: "https://img.danawa.com/prod_img/500000/431/651/img/18651431_1.jpg?shrink=130:130&_v=20230103230003",
    },
    {
      id: 22,
      name: "케이스",
      url: "https://img.danawa.com/prod_img/500000/484/808/img/15808484_1.jpg?shrink=130:130&_v=20211130104539",
    },
  ];

  const [topProducts, setTopProducts] = useState(null);
  useEffect(() => {
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
