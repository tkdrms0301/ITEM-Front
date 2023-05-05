import dayjs from "dayjs";
import { Container } from "@mui/system";
import { Typography, Grid } from "@mui/material";

export const IncomeTotal = ({ point, firstDate, secondaryDate }) => {
  return (
    <>
      <Container>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            pt: 3,
            pb: 3,
            border: "2px solid gray",
          }}
        >
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                ml: 1,
                mr: 1,
                color: "gray",
                fontSize: "17px",
                fontWeight: "bold",
              }}
            >
              Income This
            </Typography>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              {dayjs(firstDate).toDate().getFullYear()}/
              {dayjs(firstDate).toDate().getMonth() + 1}/
              {dayjs(firstDate).toDate().getDate()}
            </Typography>
            <Typography
              sx={{ ml: 0.5, mr: 0.5, color: "gray", fontWeight: "bold" }}
            >
              ~
            </Typography>
            <Typography sx={{ fontWeight: "bold", color: "gray" }}>
              {dayjs(secondaryDate).toDate().getFullYear()}/
              {dayjs(secondaryDate).toDate().getMonth() + 1}/
              {dayjs(secondaryDate).toDate().getDate()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "gray", mr: 1 }}
            >
              {point}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "gray" }}>
              P
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
