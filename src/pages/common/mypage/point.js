import {
  Typography,
  Card,
  Box,
  CardContent,
  CardHeader,
  Paper,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Iconify from "../../../theme/Iconify";
import { useNavigate } from "react-router-dom";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: theme.spacing(2),
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(6),
  height: theme.spacing(6),
  justifyContent: "center",
  marginBottom: theme.spacing(1.5),
}));

const list = [
  {
    name: "이용내역",
    icon: <Iconify icon={"ic:baseline-history"} color="#1877F2" width={27} />,
    link: "/mypage/point/history",
  },
  {
    name: "포인트 충전",
    icon: <Iconify icon={"zondicons:add-outline"} color="#DF3E30" width={27} />,
    link: "/mypage/point/rechargeMain",
  },
  {
    name: "교환소",
    icon: (
      <Iconify icon={"icon-park-outline:change"} color="#1C9CEA" width={27} />
    ),
    link: "/mypage/point/dex",
  },
];

export const Point = ({ userState, color = "primary" }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        pb: 1,
        boxShadow: 10,
        textAlign: "right",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
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
          <Iconify icon={"mdi:money"} width={35} height={10} />
        </StyledIcon>

        <Typography variant="h4">보유 포인트</Typography>
      </Box>

      <Typography variant="h5" sx={{ opacity: 0.72, mb: 2, mr: 2 }}>
        {userState.point} Point
      </Typography>

      <Typography variant="subtitle2" textAlign={"right"} sx={{ mr: 2, mb: 2 }}>
        충전계좌 : {userState.account}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {list.map((data, index) => {
          return (
            <Paper
              key={index}
              variant="outlined"
              sx={{ mx: 1, py: 2, textAlign: "center" }}
              onClick={(e) =>
                navigate(
                  { pathname: data.link },
                  { state: { userState: userState } }
                )
              }
            >
              <Box sx={{ mb: 0.5 }}>{data.icon}</Box>

              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {data.name}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Card>
  );
};
