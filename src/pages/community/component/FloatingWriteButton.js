import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const FloatingWriteButton = () => {
  return (
    <Link to={"/community/newpost"}>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "10vh",
          right: "3vh",
        }}
      >
        <EditIcon />
      </Fab>
    </Link>
  );
};
