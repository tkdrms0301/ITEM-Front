import { Button, Grid, Typography } from "@mui/material";
import { BackButton } from "./backButton";
import { useNavigate } from "react-router-dom";

export const TitleButtonBar = ({
  title,
  buttonLabel,
  query,
  transmitData,
  completed,
}) => {
  const titleBarStyle = {
    position: "fixed",
    bgcolor: "white",
    zIndex: 100,
    maxWidth: "sm",
    width: "100%",
    height: "56px",
    borderBottom: "1px solid black",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const alert = () => {
    if (completed.isCompleted) {
      navigate(-1);
    } else {
      window.alert(completed.msg);
    }
  };

  return (
    <Grid container sx={titleBarStyle}>
      <Grid item xs={2}>
        <BackButton />
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        {buttonLabel == null ? null : (
          <Button variant="contained" onClick={alert} sx={{ ml: "-15%" }}>
            {buttonLabel}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
