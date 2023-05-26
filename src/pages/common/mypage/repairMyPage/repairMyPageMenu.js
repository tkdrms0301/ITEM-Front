import { Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const RepairMyPageMenu = () => {
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
    roleType === "MECHANIC"
      ? [
          {
            title: "수익조회",
            navigate: `/mypage/incomeMonitor`,
          },
          {
            title: "서비스 항목 관리",
            navigate: `/mypage/serviceList/panel`,
          },
          {
            title: "예약 내역",
            navigate: `/repair/mypage/reservation`,
          },
          {
            title: "견적 내역",
            navigate: `/repair/mypage/estimate`,
          },
        ]
      : [
          {
            title: "예약 내역",
            navigate: `/repair/mypage/reservation`,
          },
          {
            title: "견적 내역",
            navigate: `/repair/mypage/estimate`,
          },
        ];

  return (
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
  );
};
