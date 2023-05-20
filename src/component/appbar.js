import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";
import { AccountPopover } from "./accountPopover";
import { useState, useEffect } from "react";
import { get } from "../api";

function ResponsiveAppBar() {
  const logo = (
    <Box
      component="img"
      src="/Item.svg"
      sx={{ width: 170, height: 50, cursor: "pointer" }}
    />
  );

  const [userState, setUserState] = useState({
    userName: "",
    userId: 0,
    point: 0,
    isSubscription: false,
    account: "",
    roleType: "",
    imgUrl: "",
  });

  useEffect(() => {
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
            imgUrl: `/images/avatars/avatar_${
              Math.floor(Math.random() * (24 - 1)) + 1
            }.jpg`,
          });
        })
        .catch((error) => {
          console.log(error);
          // window.location.replace("/login");
        });
    }
  }, []);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "grey.100" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Link to="/" component={RouterLink} sx={{ display: "contents" }}>
              {logo}
            </Link>
          </Grid>

          <AccountPopover userState={userState}></AccountPopover>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
