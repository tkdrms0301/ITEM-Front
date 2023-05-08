import { Container, Grid, Typography, Avatar } from "@mui/material";

import { useEffect, useState } from "react";

export const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("user")) !== null) {
      setUserName(JSON.parse(window.localStorage.getItem("user")).name);
    }
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        pt: 2,
        pb: 1,
        borderBottom: "2px solid gray",
        display: "flex",
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <img src="/ItemLogo.png" width={"70%"}></img>
        </Grid>
        {userName !== "" ? (
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h7" sx={{ mr: 1, fontWeight: "bold" }}>
              {userName}
            </Typography>
            <Avatar></Avatar>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};
