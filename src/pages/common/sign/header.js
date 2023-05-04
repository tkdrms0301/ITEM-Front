import { Container, Grid } from "@mui/material";

export const Header = () => {

  return (
    <Grid container spacing={1}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          marginTop: "10%",
          marginBottom: "5%",
          textAlign: "center",
        }}
      >
        <img src="/ItemLogo.png" width={"80%"}></img>
      </Container>
    </Grid>
  );
};
