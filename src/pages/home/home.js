import { useEffect, useState } from "react";
import { Header } from "../common/mypage/header";
import { Grid, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import SystemSecurityUpdateWarningIcon from "@mui/icons-material/SystemSecurityUpdateWarning";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import { Box } from "@mui/system";

export const Home = () => {
  const reservationMenu = [
    {
      title: "S/W 오류",
      icon: <SystemSecurityUpdateWarningIcon sx={{ fontSize: "35px" }} />,
    },
    {
      title: "수리",
      icon: <BuildIcon sx={{ fontSize: "35px" }} />,
    },
    {
      title: "점검",
      icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: "35px" }} />,
    },
  ];

  const aroundPlaceMenu = [
    {
      title: "공식서비스",
      icon: <AppleIcon sx={{ fontSize: "35px" }} />,
    },
    {
      title: "사설서비스",
      icon: <BuildIcon sx={{ fontSize: "35px" }} />,
    },
  ];

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
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={11}
          sx={{
            border: "1px solid gray",
            borderRadius: "15px",
            pt: 2,
            mt: 2,
            backgroundColor: "#F0F0F0",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold", fontSize: "19px", ml: 3 }}>
                정비소 예약
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {reservationMenu.map((data, index) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                  }}
                  key={index}
                >
                  {data.icon}
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "bold", mt: 1, mb: 2 }}
                  >
                    {data.title}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            border: "1px solid gray",
            borderRadius: "15px",
            mt: 2,
            backgroundColor: "#F0F0F0",
            mr: 4,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: 3,
              }}
            >
              <ArticleIcon sx={{ fontSize: "35px" }} />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ pb: 3, mt: 1, fontWeight: "bold" }}>
                정비리포트
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            borderRadius: "15px",
            mt: 2,
            backgroundColor: "#86C2FD",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: 3,
              }}
            >
              <LocalActivityOutlinedIcon sx={{ fontSize: "35px" }} />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ pb: 3, mt: 1, color: "#DBDCDC", fontWeight: "bold" }}
              >
                첫 예약 혜택
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={11}
          sx={{
            border: "1px solid gray",
            borderRadius: "15px",
            pt: 2,
            mt: 2,
            backgroundColor: "#F0F0F0",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold", fontSize: "19px", ml: 3 }}>
                내 주변 장소
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {aroundPlaceMenu.map((data, index) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                  }}
                  key={index}
                >
                  {data.icon}
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "bold", mt: 1, mb: 2 }}
                  >
                    {data.title}
                  </Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={11}
          sx={{
            border: "1px solid gray",
            borderRadius: "10px",
            p: 1,
            mt: 2,
            backgroundColor: "#E8E8E8",
          }}
        >
          <Grid container sx={{}}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "19px",
                }}
              >
                내 IT 기기 묻고 답하기 {">"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
