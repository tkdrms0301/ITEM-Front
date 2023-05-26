import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import palette from "../../../theme/palette";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Handyman from "@mui/icons-material/Handyman";
import { useNavigate } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const PlanList = ({ planList }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ py: 1, px: 2, my: 2 }}>
      <Accordion>
        <AccordionSummary
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Grid container sx={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={12}>
              <Typography variant="h4">{planList.planTitle}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontSize: "12px", mt: 1 }}>
                {planList.subTitle}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            borderTop: "2px solid #f1f1f1",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", my: 1 }}
            >
              <Typography variant="h4">{planList.planPrice}</Typography>
              <Typography variant="subtitle2" sx={{ color: palette.grey[500] }}>
                /{planList.planDate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, color: palette.grey[500] }}
                >
                  {planList.planService1}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {planList.planServiceDate1}
                </Typography>
              </Box>

              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, color: palette.grey[500] }}
                >
                  {planList.planService2}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {planList.planServiceDate2}
                </Typography>
              </Box>

              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, color: palette.grey[500] }}
                >
                  {planList.planService3}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {planList.planServiceDate3}
                </Typography>
              </Box>

              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1, color: palette.grey[500] }}
                >
                  분석 채널
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  <PeopleIcon sx={{ mr: 1 }} />
                  <ShoppingBasketIcon sx={{ mr: 1 }} />
                  <Handyman />
                </Typography>
              </Box>
            </Grid>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="inherit"
              onClick={(e) => planList.onClick()}
              sx={{ mt: 2 }}
            >
              시작하기
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};
