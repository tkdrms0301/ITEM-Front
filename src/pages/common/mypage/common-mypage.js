import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import { Point } from "./point";
import { Account } from "./account";
import { ButtonMenu } from "./buttonMenu";
import { Subscription } from "./subscription";
import { BottomMenu } from "./bottomMenu";
import DeviceManagement from "../device-management/index";

export const CommonMyPage = () => {
  const [userName, setUserName] = useState("성세경");
  const [point, setPoint] = useState(15000);
  const [isSubscription, setIsSubscription] = useState(true);
  const [account, setAccount] = useState("충전계좌 : 하나은행 05-50053-34");

  const onSubmitUpdate = (e) => {
    /* 정보수정 최종 요청 */
  };

  return (
    <Grid container spacing={1}>
      <Header userName={userName}></Header>
      <Point point={point}></Point>
      <Account account={account}></Account>
      <ButtonMenu></ButtonMenu> 
      <Subscription isSubscription={isSubscription}></Subscription>
      <BottomMenu></BottomMenu>
    </Grid>
  );
};
