import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Point } from "./point";
import { Account } from "./account";
import { ButtonMenu } from "./buttonMenu";
import { Subscription } from "./subscription";
import { BottomMenu } from "./bottomMenu";

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

      setUserState({
        ...userState,
        userName: JSON.parse(window.localStorage.getItem("user")).name,
        userId: JSON.parse(window.localStorage.getItem("user")).memberId,
        roleType: JSON.parse(window.localStorage.getItem("user")).roleType,
        point: 15000,
        account: "하나은행 05-50053-34",
        isSubscription: true,
      });
    } else {
      window.location.replace("/login");
    }
  }, []);

  return (
    <>
      {userName !== "" ? (
        <Grid container>
          <Header userName={userName} />
          <Point point={point} />
          <Account account={account} />
          <ButtonMenu />
          <Subscription isSubscription={isSubscription} />
          <BottomMenu userId={userId} roleType={roleType} />
        </Grid>
      ) : null}
    </>
  );
};
