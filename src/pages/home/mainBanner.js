import { Card, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

import { alpha, styled } from "@mui/material/styles";
import Iconify from "../../theme/Iconify";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(4.5),
  height: theme.spacing(4.5),
  justifyContent: "center",
  marginBottom: theme.spacing(1.5),
}));

export const MainBanner = ({ color = "primary" }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        pb: 1,
        mb: 2,
        boxShadow: 10,
        textAlign: "right",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          ml: 2,
          my: 2,
        }}
      >
        <Typography variant="h5" sx={{}}>
          ITEM에서 수리하고
        </Typography>
        <Typography variant="h5" sx={{}}>
          포인트 환급도 받으세요
        </Typography>
      </Box>

      <Box
        component="img"
        src="/img_mob_reserva.png"
        sx={{ width: "100%", height: "100%", cursor: "pointer" }}
      />
      <Box
        sx={{
          display: "grid",
        }}
      >
        <Paper
          variant="outlined"
          sx={{ mx: 1, py: 2, textAlign: "left", display: "flex" }}
          onClick={(e) => navigate(`/`)}
        >
          <Box sx={{ mb: 0.5, ml: 2 }}>
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              최저가 견적받기
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              많은 이용자가 최저가를 찾았어요!
            </Typography>
          </Box>
          <StyledIcon
            sx={{
              color: (theme) => theme.palette[color].secondary,
              backgroundImage: (theme) =>
                `linear-gradient(135deg, ${alpha(
                  theme.palette[color].dark,
                  0
                )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
            }}
          >
            <Iconify icon={"maki:arrow"} width={20} height={10} />
          </StyledIcon>
        </Paper>
      </Box>
    </Card>
  );
};
