import { Container, Grid } from "@mui/material";

export const Header = () => {
  return (
    <Grid container spacing={1}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          marginTop: "20%",
          marginBottom: "10%",
          textAlign: "center",
        }}
      >
        <img src="/ItemLogo.png" width={"90%"}></img>
      </Container>
    </Grid>
  );
};
