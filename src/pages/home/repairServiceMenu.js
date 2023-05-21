import { Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import Iconify from "../../theme/Iconify";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

export const RepairServiceMenu = ({ color = "secondary" }) => {
  const navigate = useNavigate();

  return (
    <Grid container sx={{ mb: 2 }}>
      <Grid item xs={5.5}>
        <Card
          sx={{
            pb: 1,
            boxShadow: 10,
            bgcolor: (theme) => theme.palette[color].lighter,
            color: (theme) => theme.palette[color].darker,
            minHeight: "190px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onClick={(e) => navigate(`/repair/mypage/reservation`)}
        >
          <Typography variant="h4" textAlign={"left"} sx={{ ml: 2, mt: 1 }}>
            수리 리포트
          </Typography>
          <Typography
            variant="subtitle2"
            textAlign={"left"}
            sx={{ ml: 2, mb: 1 }}
          >
            내 수리내역 바로보기
          </Typography>
          <Iconify
            icon={"flat-color-icons:todo-list"}
            width={80}
            sx={{ m: "auto", my: 0 }}
          />
        </Card>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid
        item
        xs={5.5}
        columns={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card
          sx={{
            pb: 1,
            boxShadow: 10,
            textAlign: "center",
            bgcolor: (theme) => theme.palette["warning"].lighter,
            color: (theme) => theme.palette["warning"].darker,
          }}
          onClick={(e) => navigate(`/repair/privateShops`)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" textAlign={"left"} sx={{ ml: 1.5, my: 1 }}>
              사설 서비스
            </Typography>
            <Iconify
              icon={"carbon:service-id"}
              width={30}
              sx={{ m: "auto", my: 0 }}
            />
          </Box>

          <Typography
            variant="subtitle2"
            textAlign={"left"}
            sx={{ ml: 1.5, whiteSpace: "pre-wrap" }}
          >
            가까운 수리점부터,
            <br />
            예약까지!
          </Typography>
        </Card>
        <Card
          sx={{
            pb: 1,
            boxShadow: 10,
            textAlign: "center",
            bgcolor: (theme) => theme.palette[color].lighter,
            color: (theme) => theme.palette[color].darker,
          }}
          onClick={(e) => navigate(`/repair/publicShops`)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" textAlign={"left"} sx={{ ml: 1.5, mt: 1 }}>
              공식 서비스
            </Typography>
            <Iconify
              icon={"ic:baseline-apple"}
              width={30}
              sx={{ m: "auto", my: 0 }}
            />
          </Box>
          <Typography
            variant="subtitle2"
            textAlign={"left"}
            sx={{ ml: 1.5, mb: 1 }}
          >
            공식서비스 위치보기
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};
