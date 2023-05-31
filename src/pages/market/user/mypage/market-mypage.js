import { Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Header } from "../component/header";

export const UserMarketMypage = () => {
  const [userState, setUserState] = useState({
    userName: "",
    userId: 0,
    point: 0,
    isSubscription: false,
    account: "",
    roleType: "",
  });

  const { userName, userId, point, isSubscription, account, roleType } =
    userState;

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("user")) !== null) {
      //서버 호출 - 주는데이터 jwt, 받는데이터(point, account, isSubscription)

      setUserState({
        ...userState,
        userName: JSON.parse(window.localStorage.getItem("user")).name,
        userId: JSON.parse(window.localStorage.getItem("user")).memberId,
        roleType: JSON.parse(window.localStorage.getItem("user")).roleType,
        point: 15000,
        account: "하나은행 05-50053-34",
        isSubscription: true,
      });
    }
  }, []);

  const navigate = useNavigate();

  const menuList =
    roleType === "SELLER"
      ? [{}]
      : [
          {
            title: "주문 내역",
            navigate: `/market/mypage/history`,
          },
          {
            title: "장바구니",
            navigate: `/market/mypage/cart`,
          },
        ];

  return (
    <>
      <Header title={"마켓 마이페이지"}></Header>
      <Container
        width={"90%"}
        sx={{
          justifyContent: "center",
          mt: 3,
        }}
      >
        {menuList.map((data, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              p: 1,
              my: 2,
              "&:hover": {
                bgcolor: "action.selected",
                fontWeight: "fontWeightBold",
              },
            }}
            onClick={(e) => navigate(data.navigate)}
          >
            <Typography variant="h5">{data.title}</Typography>
          </Card>
        ))}
      </Container>
    </>
  );
};
