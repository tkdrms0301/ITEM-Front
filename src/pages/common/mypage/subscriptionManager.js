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
import palette from "../../../theme/palette";

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
export const SubscriptionManager = ({ userState, color = "primary" }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        mt: 2,
        mb: 2,
        pb: 1,
        boxShadow: 10,
        textAlign: "right",
        backgroundImage: (theme) =>
          `linear-gradient(135deg, ${alpha(
            theme.palette[color].dark,
            0
          )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
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
          <Iconify
            icon={"eos-icons:product-subscriptions"}
            width={35}
            height={10}
          />
        </StyledIcon>

        <Typography variant="h4">ITEM 무제한 데이터 구독</Typography>
      </Box>
      {userState.subscription !== null ? (
        <Typography
          variant="subtitle1"
          sx={{ opacity: 0.72, mb: 2, mr: 2, color: "MenuText" }}
        >
          {userState.subscription} 만료예정
        </Typography>
      ) : (
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ opacity: 0.72, mb: 1, mr: 2, color: "MenuText" }}
          >
            첫 결제 시 3개월간 월 5,000원부터!
          </Typography>
          <Typography
            variant="h5"
            sx={{ opacity: 0.72, mr: 2, color: "MenuText" }}
            onClick={(e) => {
              navigate(`/mypage/subscription`);
            }}
          >
            구매하기{`▶`}
          </Typography>
        </Box>
      )}
    </Card>
  );
};
