import { Grid, Typography } from "@mui/material";
import { BackButton } from "./backButton";

export const TitleButtonBar = ({ title }) => {
  const titleBarStyle = {
    position: "fixed",
    bgcolor: "white",
    zIndex: 100,
    width: "100%",
    height: "56px",
    borderBottom: "1px solid black",
    alignItems: "center",
  };

  return (
    <Grid container sx={titleBarStyle}>
      <Grid
        item
        xs={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <BackButton />
      </Grid>
      <Grid
        item
        xs={8}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};
