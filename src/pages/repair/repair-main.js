import React from "react";
import "./css/repair-main.css";
import { Link } from "react-router-dom";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "../../theme/Iconify";

export const RepairMain = ({ color = "primary" }) => {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ my: "50%" }}>
        <Card
          sx={{
            py: 3,
            my: 5,
            boxShadow: 10,
            textAlign: "center",
            bgcolor: (theme) => theme.palette["warning"].lighter,
            color: (theme) => theme.palette["warning"].darker,
          }}
          onClick={(e) => navigate(`/repair/privateShops`)}
        >
          <Grid container>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h4"
                textAlign={"left"}
                sx={{ ml: 1.5, mt: 1 }}
              >
                사설 서비스
              </Typography>
              <Typography
                variant="subtitle2"
                textAlign={"left"}
                sx={{ ml: 1.5, whiteSpace: "pre-wrap" }}
              >
                가까운 수리점부터, 예약까지!
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Iconify
                icon={"carbon:service-id"}
                width={50}
                sx={{ m: "auto", my: 0 }}
              />
            </Grid>
          </Grid>
        </Card>
        <Card
          sx={{
            py: 3,
            boxShadow: 10,
            textAlign: "center",
            bgcolor: (theme) => theme.palette[color].lighter,
            color: (theme) => theme.palette[color].darker,
          }}
          onClick={(e) => navigate(`/repair/publicShops`)}
        >
          <Grid container>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h4"
                textAlign={"left"}
                sx={{ ml: 1.5, mt: 1 }}
              >
                공식 서비스
              </Typography>
              <Typography
                variant="subtitle2"
                textAlign={"left"}
                sx={{ ml: 1.5 }}
              >
                공식서비스 위치보기
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Iconify
                icon={"ic:baseline-apple"}
                width={50}
                sx={{ m: "auto", my: 0 }}
              />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};
