import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { Header } from "./header";
import { Point } from "./point";
import { Account } from "./account";
import { ButtonMenu } from "./buttonMenu";
import { Subscription } from "./subscription";
import { BottomMenu } from "./bottomMenu";
import { get } from "../../../api";

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
    console.log();
    if (JSON.parse(window.localStorage.getItem("user")) !== null) {
      //서버 호출 - 주는데이터 jwt, 받는데이터(point, account, isSubscription)
      get("http://localhost:8080/api/member/info")
        .then((response) => {
          setUserState({
            ...userState,
            userName: response.data.data.name,
            userId: response.data.data.id,
            roleType: response.data.data.roleType,
            point: response.data.data.point,
            account: response.data.data.account,
            isSubscription: response.data.data.subscription,
          });
        })
        .catch((error) => {
          console.log(error);
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
