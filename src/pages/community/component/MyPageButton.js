import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const MyPageButton = (props) => {
  return (
    <Link to={`/community/mypage/${props.userId}`}>
      <IconButton
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <PersonIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    </Link>
  );
};
