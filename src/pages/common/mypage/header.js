import { Container, Grid, Typography, Avatar } from "@mui/material";

export const Header = ({ userName }) => {
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
      </Grid>
    </Container>
  );
};
