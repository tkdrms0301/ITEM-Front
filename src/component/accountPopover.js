import {
  Container,
  Grid,
  Typography,
  Avatar,
  IconButton,
  alpha,
  Popover,
  Box,
  Divider,
  Stack,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MENU_OPTIONS = [
  {
    label: "프로필 수정",
    icon: "eva:person-fill",
    nav: `/mypage/user/infoUpdate`,
  },
  {
    label: "마이페이지",
    icon: "eva:settings-2-fill",
    nav: `/mypage`,
  },
];

export const AccountPopover = ({ userState }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);

  const handleOpen = (event) => {
    setOpen(true);
    setCurrentTarget(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logOutClick = (e) => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    if (window.innerWidth < 1200) {
      window.location.replace("/");
    } else {
      window.location.replace("/data");
    }
  };

  return (
    <Grid
      container
      sx={{
        pt: 1,
        pb: 1,
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap",
      }}
    >
      {userState.nickname !== "" ? (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <Avatar src={userState.imgUrl} alt="photoURL" />
          </IconButton>
          <Popover
            open={open}
            anchorEl={currentTarget}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                p: 0,
                mt: 1.5,
                ml: 0.75,
                width: 180,
                "& .MuiMenuItem-root": {
                  typography: "body2",
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <Box sx={{ my: 1.0, px: 3.0 }}>
              <Typography variant="subtitle1" noWrap>
                {userState.nickname}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ mt: 1, color: "text.secondary" }}
                noWrap
              >
                {userState.account}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack sx={{ pl: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  onClick={(e) => navigate(option.nav)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem onClick={logOutClick} sx={{ ml: 1 }}>
              로그아웃
            </MenuItem>
          </Popover>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography
            component="a"
            href="/login"
            variant="subtitle2"
            sx={{ mr: 1, color: "grey.800" }}
          >
            로그인
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
