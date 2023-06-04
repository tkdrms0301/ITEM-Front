import "../css/RepairListItem.css";
import { Link } from "react-router-dom";
import { Card, Grid, Rating, Typography } from "@mui/material";
import palette from "../../../theme/palette";

const PrivateRepairListItem = ({ shop }) => {
  const shopTypes = [
    "휴대폰, 테블릿 전문 수리점",
    "컴퓨터, 노트북 전문 수리점",
  ];

  return (
    <>
      <Link
        to={"/repair/privateShops/detail"}
        className="repair_shop_detail_link"
        state={{ shop: shop }}>
        <Card
          sx={{
            borderRadius: "0px",
            borderTop: "1px solid",
            borderColor: "#F1F1F1",
          }}>
          <Grid
            container
            sx={{
              display: "flex",
              pt: 1,
            }}>
            <Grid
              item
              xs={10}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}>
              <Typography variant="h4" sx={{ pl: 2 }}>
                {shop.shopName}
              </Typography>
              <Typography variant="caption" sx={{ ml: 1, fontWeight: "bold" }}>
                (
                {shop.shopType === "모바일" || shop.shopType === "테블릿"
                  ? shopTypes[0]
                  : shopTypes[1]}
                )
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "right",
                  color: palette.error.main,
                  pr: 2,
                }}>
                {shop.distance}Km
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              display: "flex",
            }}>
            <Grid item xs={9}>
              <Typography variant="subtitle2" sx={{ pl: 2, mb: 1 }}>
                {shop.shopAddress}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Rating
                sx={{
                  width: "100px",
                  height: "20px",
                  fontSize: "15px",
                  justifyContent: "flex-end",
                  pr: 1,
                }}
                readOnly
                name="simple-controlled"
                value={4}
              />
            </Grid>
          </Grid>
        </Card>
      </Link>
    </>
  );
};

export default PrivateRepairListItem;
