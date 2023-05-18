import { Container, Grid, Typography } from "@mui/material";

export const Account = ({ account }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#64B5F6",
        width: "90%",
        p: "3%",
      }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Typography
            sx={{ fontSize: "13px", fontWeight: "bold", color: "#4B4640" }}
          >
            충전계좌 : {account}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
