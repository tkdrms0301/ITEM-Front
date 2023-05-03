import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

export const Subscription = ({ isSubscription }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        marginTop: "5%",
        backgroundColor: "#E0E0E0",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        p: "3%",
      }}
    >
      <Grid item xs={8}>
        <Typography variant="h7" sx={{ pl: "3%", fontWeight: "bold" }}>
          ITEM 무제한 데이터 구독
        </Typography>
      </Grid>
      {isSubscription ? (
        <Grid
          item
          xs={3}
          sx={{
            backgroundColor: "#1ABD9A",
            borderRadius: "10px",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "3.5vw",
          }}
        >
          활성화
        </Grid>
      ) : (
        <Grid
          item
          xs={3}
          sx={{
            backgroundColor: "#E77B76",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            fontSize: "3.5vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          비활성화
        </Grid>
      )}
    </Container>
  );
};
