import { Box } from "@mui/system";
import {
  Card,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import palette from "../../../theme/palette";
import Iconify from "../../../theme/Iconify";

export const AmountList = ({ amountList, handleChange }) => {
  return (
    <Card sx={{ boxShadow: 10, py: 3 }}>
      <Typography variant="h4" sx={{ mx: 3 }}>
        충전/결제
      </Typography>
      <Typography variant="caption" sx={{ mx: 3, fontWeight: 500 }}>
        아래의 충전금액을 선택하고 결제를 진행해 주세요.
        <br />
      </Typography>
      <Typography variant="caption" sx={{ mx: 3, fontWeight: 500 }}>
        ※ 충전 포인트는 유효기간 없이 사용 가능합니다.
      </Typography>
      <FormControl
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <RadioGroup
          defaultValue="medium"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          {amountList.map((data, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{ my: 1, display: "flex" }}
            >
              <Radio value={data.amount} size="small" sx={{ mr: -1 }} />
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
                      width={32}
                    />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "Public Sans, sans-serif",
                        fontSize: "12px",
                        color: palette.info.main,
                        fontWeight: "bold",
                      }}
                    >
                      {data.point.toLocaleString()}p{" "}
                    </Typography>
                    <Typography
                      noWrap
                      sx={{
                        fontFamily: "Public Sans, sans-serif",
                        fontWeight: "bold",
                        fontSize: "13px",
                        mr: 0.5,
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
                      mr: 0.5,
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
                      flexWrap: "nowrap",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      height={35}
                      sx={{
                        fontSize: "12px",
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
                        fontSize: "12px",
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
        </RadioGroup>
      </FormControl>
    </Card>
  );
};
