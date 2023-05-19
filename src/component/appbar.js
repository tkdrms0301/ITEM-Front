import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function ResponsiveAppBar() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("user")) === null) {
      setIsLogin(false);
    }
  }, []);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  alignItems: "center",
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ITEM
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
