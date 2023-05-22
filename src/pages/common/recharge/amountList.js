import { Box } from "@mui/system";
import { Card, Grid, Paper, Typography } from "@mui/material";
import palette from "../../../theme/palette";
import Iconify from "../../../theme/Iconify";

export const AmountList = ({ amountList }) => {
  return (
    <Card sx={{ boxShadow: 10, p: 1, py: 1 }}>
      {amountList.map((data, index) => (
        <Paper key={index} variant="outlined" sx={{ my: 1 }}>
          <Grid container>
            <Grid
              item
              xs={5}
              sx={{
                borderRight: "1px solid #f1f1f1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 1,
              }}
            >
              <Box>
                <Iconify
                  icon={"eos-icons:product-subscriptions-outlined"}
                  width={35}
                  height={10}
                  sx={{ mr: 1 }}
                />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography
                  sx={{
                    fontFamily: "Public Sans, sans-serif",
                    fontSize: "14px",
                    color: palette.info.main,
                    fontWeight: "bold",
                  }}
                >
                  {data.point.toLocaleString()}p{" "}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Public Sans, sans-serif",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  {data.amount.toLocaleString()}원
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={7}
              sx={{
                borderRight: "1px solid #f1f1f1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  mr: 1,
                }}
              >
                <Iconify icon={"mingcute:coupon-line"} width={35} />
                <Iconify icon={"mingcute:coupon-line"} width={35} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="subtitle2"
                  height={35}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {data.discountCouponMainOption}% 할인쿠폰{" "}
                  {data.discountCouponMainOptionCount}장
                </Typography>
                <Typography
                  variant="subtitle2"
                  height={35}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {data.discountCouponSubOption}% 할인쿠폰{" "}
                  {data.discountCouponSubOptionCount}장
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Card>
  );
};
