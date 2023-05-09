import { useEffect, useState } from "react";
import { Header } from "../common/mypage/header";
import { Grid } from "@mui/material";

export const Home = () => {
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

  return (
    <>
      {userName !== "" ? <Header userName={userName}></Header> : null}
      <Grid container>
        <Grid item xs={12}>
          Home Test
        </Grid>
      </Grid>
    </>
  );
};
