import { Box, Container, Grid } from "@mui/material";

export const Header = () => {
  return (
    <Grid container spacing={1}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          marginTop: 10,
          marginBottom: 10,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/ItemLogo.png"
          sx={{ width: 400, cursor: "pointer" }}
        />
      </Container>
    </Grid>
  );
};
