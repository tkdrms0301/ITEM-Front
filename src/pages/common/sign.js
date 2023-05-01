import { Container, Grid, Typography } from "@mui/material";

export const Sign = () => {
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
        사진 존
      </Container>

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          boxSizing: "border-box",
          border: "1px solid black",
          justifyContent: "center",
          textAlign: "center",
          width: "80%",
          display: "flex",
        }}
      >
        <Grid item xs={4} sx={{ borderRight: "1px solid black" }}>
          일반 사용자
        </Grid>
        <Grid item xs={4} sx={{ borderRight: "1px solid black" }}>
          판매사
        </Grid>
        <Grid item xs={4}>
          정비사
        </Grid>
      </Container>

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          marginTop: "3%",
          boxSizing: "border-box",
          backgroundColor: "#FBEEE6",
          justifyContent: "center",
          textAlign: "center",
          width: "80%",
          display: "flex",
        }}
      >
        <div sx={{ display: "flex" }}>
          <Grid sx={{ justifyContent: "flex-start" }}>
            <Typography>이메일</Typography>
          </Grid>
          <div></div>
        </div>
      </Container>
    </Grid>
  );
};
