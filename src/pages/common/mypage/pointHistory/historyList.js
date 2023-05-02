import { Container, Grid, Typography } from "@mui/material";

export const HistoryList = ({ itemList }) => {
  return (
    <>
      <Container>
        {itemList.map((data, index) => (
          <Grid
            container
            key={data.id}
            sx={{ mt: 2, backgroundColor: "#F9F9F9" }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={data.img} width={"50%"} height={"80%"}></img>
            </Grid>
            <Grid item xs={7}>
              <Grid container sx={{ ml: 1, p: 1 }}>
                <Grid item xs={12}>
                  <Typography
                    variant="h7"
                    sx={{ fontWeight: "bold", color: "#9A9A9A" }}
                  >
                    {data.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#747373",
                    }}
                  >
                    {data.model}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                    {data.point.toLocaleString()} ITEM 포인트
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              d
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
};
