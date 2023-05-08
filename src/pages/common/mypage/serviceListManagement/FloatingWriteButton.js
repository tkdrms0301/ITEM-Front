import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const FloatingWriteButton = () => {
  return (
    <Link to={"/mypage/serviceList/add"}>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "10vh",
          right: "3vh",
        }}
      >
        <AddIcon />
      </Fab>
    </Link>
  );
};
