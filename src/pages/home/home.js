import { useEffect, useState } from "react";
import { Header } from "../../component/accountPopover";
import { Grid, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import SystemSecurityUpdateWarningIcon from "@mui/icons-material/SystemSecurityUpdateWarning";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

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
      route: "/repair/publicShops",
    },
    {
      title: "사설서비스",
      icon: <BuildIcon sx={{ fontSize: "35px" }} />,
      route: "/repair/privateShops",
    },
  ];

  return (
    <>
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
            borderRadius: "5px",
            pt: 2,
            mt: 2,
            backgroundColor: "#64B5F6",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: "#4B4640",
                  fontWeight: "bold",
                  fontSize: "21px",
                  ml: 3,
                }}
              >
                정비소 예약
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                color: "#4B4640",
              }}
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
                    sx={{
                      color: "#4B4640",
                      fontSize: "12px",
                      fontWeight: "bold",
                      mt: 1,
                      mb: 2,
                    }}
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
            borderRadius: "5px",
            mt: 2,
            backgroundColor: "#81D4FA",
            mr: 4,
            color: "#4B4640",
          }}
        >
          <Grid
            container
            onClick={(e) => navigate(`/repair/mypage/reservation`)}
          >
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
            borderRadius: "5px",
            mt: 2,
            backgroundColor: "#81D4FA",

            color: "#4B4640",
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
              <Typography sx={{ pb: 3, mt: 1, fontWeight: "bold" }}>
                첫 예약 혜택
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={11}
          sx={{
            borderRadius: "5px",
            pt: 2,
            mt: 2,
            backgroundColor: "#64B5F6",

            color: "white",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "21px",
                  ml: 3,
                  color: "#4B4640",
                }}
              >
                내 주변 장소
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                color: " #4B4640",
              }}
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
                  onClick={(e) => {
                    navigate(data.route);
                  }}
                >
                  {data.icon}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      mt: 1,
                      mb: 2,
                    }}
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
            borderRadius: "5px",
            p: 1,
            mt: 2,
            backgroundColor: "#81D4FA",
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
                variant="h6"
                sx={{ color: "info.main" }}
                onClick={(e) => navigate(`/community`)}
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
