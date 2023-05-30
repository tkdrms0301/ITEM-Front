import { Typography, Card, List, ListItemButton } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Iconify from "../../../theme/Iconify";
import { useNavigate } from "react-router-dom";

export const BottomMenus = ({ userState, color = "primary" }) => {
  const theme = useTheme();

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
            title: "마켓 마이페이지",
            nav: `/market/mypage`,
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
            nav: `/community/mypage/`,
            icon: "material-symbols:chat",
          },
          {
            title: "마켓 마이페이지",
            nav: `/market/mypage`,
            icon: "healthicons:market-stall-outline",
          },
        ];
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        boxShadow: 10,
        textAlign: "left",
        mb: 3,
        bgcolor: (theme) => theme.palette["secondary"].lighter,
        color: (theme) => theme.palette["secondary"].darker,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          pl: 2,
          py: 2,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].darker,
              0
            )} 0%, ${alpha(theme.palette[color].darker, 0.24)} 100%)`,
        }}
      >
        마이페이지 바로가기
      </Typography>
      <List
        sx={{
          width: "100%",
          bgcolor: (theme) => theme.palette["background"].default,
        }}
      >
        {list.map((data, index) => (
          <ListItemButton
            key={index}
            onClick={(e) => navigate(data.nav)}
            sx={{
              borderBottom:
                index !== list.length - 1
                  ? `2px solid ${theme.palette.grey[400]}`
                  : "none",
            }}
          >
            <Iconify icon={data.icon} width={35} height={10} sx={{ mr: 2 }} />
            <Typography variant="h5">{data.title}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Card>
  );
};
