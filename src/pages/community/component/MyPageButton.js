import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const MyPageButton = (props) => {
  return (
    <Link to={`/community/mypage`}>
      <Box>
        <IconButton
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 0,
            backgroundColor: "white",
          }}
        >
          <PersonIcon sx={{ fontSize: "40px" }} />
          <Typography variant="body2" fontWeight="bold">
            내 글 보기
          </Typography>
        </IconButton>
      </Box>
    </Link>
  );
};
