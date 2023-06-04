import { Container, Grid } from "@mui/material";

export const Header = () => {
  return (
    <Grid container>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          my: 7,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src="/ItemLogo.png" width={"300px"} />
      </Container>
    </Grid>
  );
};
