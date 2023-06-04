import { Container, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Point } from "./point";
import { get } from "../../../api";
import { SubscriptionManager } from "./subscriptionManager";
import { BottomMenus } from "./bottomMenus";
import { BaseUrl } from "../../../api/BaseUrl";

export const CommonMyPage = () => {
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
      get(BaseUrl + "/api/member/info")
        .then((response) => {
          setUserState({
            ...userState,
            userName: response.data.data.name,
            userNickName: response.data.data.nickname,
            userId: response.data.data.id,
            roleType: response.data.data.roleType,
            point: response.data.data.point,
            account: response.data.data.account,
            subscription: response.data.data.subscription,
          });
        })
        .catch((error) => {
          window.location.replace("/login");
        });
    } else {
      window.location.replace("/login");
    }
  }, []);

  return (
    <>
      {userName !== "" ? (
        <Container
          sx={{
            marginTop: "5%",
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            반갑습니다, {userState.userNickName}님
          </Typography>
          <Point userState={userState} />
          <SubscriptionManager userState={userState} />
          <BottomMenus userState={userState} />
        </Container>
      ) : null}
    </>
  );
};
