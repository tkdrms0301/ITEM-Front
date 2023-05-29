import {
  Typography,
  Card,
  Box,
  CardContent,
  CardHeader,
  Paper,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

export const BottomMenus = ({ userState, color = "primary" }) => {
  const list =
    userState.roleType === "MEMBER"
      ? [
          {
            title: "나의 IT 기기관리",
            nav: `/mypage/device`,
            icon: "mingcute:device-line",
          },
          {
            title: "정비소 마이페이지",
            nav: `/mypage/repair`,
            icon: "game-icons:auto-repair",
          },
          {
            title: "커뮤니티 마이페이지",
            nav: `/community/mypage`,
            icon: "material-symbols:chat",
          },

          {
            title: "마켓 페이지",
            nav: `/`,
            icon: "healthicons:market-stall-outline",
          },
        ]
      : [
          {
            title: "정비소 마이페이지",
            nav: `/mypage/repair`,
            icon: "game-icons:auto-repair",
          },
          {
            title: "커뮤니티 마이페이지",
            nav: `/community/mypage`,
            icon: "material-symbols:chat",
          },
          {
            title: "마켓 페이지",
            nav: `/`,
            icon: "healthicons:market-stall-outline",
          },
        ];
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        pb: 1,
        boxShadow: 10,
        textAlign: "left",
        mb: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          pl: 2,
          py: 2,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        마이페이지 바로가기
      </Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
        }}
      >
        {list.map((data, index) => (
          <ListItemButton key={index} onClick={(e) => navigate(data.nav)}>
            <Iconify icon={data.icon} width={35} height={10} sx={{ mr: 2 }} />
            <Typography variant="h5" sx={{ color: palette.text.secondary }}>
              {data.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Card>
  );
};
