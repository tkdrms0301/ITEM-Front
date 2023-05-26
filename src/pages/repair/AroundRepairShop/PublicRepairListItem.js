import { Card, Grid, Typography } from "@mui/material";
import "../css/RepairListItem.css";
import { Link } from "react-router-dom";
import palette from "../../../theme/palette";

const PublicRepairListItem = ({ shop }) => {
  return (
    <>
      <Link
        to={"/repair/publicShops/detail"}
        className="repair_shop_detail_link"
        state={{ shop: shop }}
      >
        <Card
          sx={{
            borderRadius: "0px",
            borderTop: "1px solid",
            borderColor: "#F1F1F1",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              pt: 1,
            }}
          >
            <Grid item xs={10}>
              <Typography variant="h4" sx={{ pl: 2 }}>
                {shop.shopName}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "right",
                  color: palette.error.main,
                  pr: 2,
                }}
              >
                {shop.distance}Km
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
            }}
          >
            <Grid item xs={9}>
              <Typography variant="subtitle2" sx={{ pl: 2, mb: 1 }}>
                {shop.shopAddress}
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Card>
      </Link>
    </>
  );
};

export default PublicRepairListItem;
