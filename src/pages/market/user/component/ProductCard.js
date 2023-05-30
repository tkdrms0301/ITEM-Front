import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import { fCurrency } from "../../../data/utils/formatNumber";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  width: 150,
  maxHeight: 150,
});

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ product }) {
  const { name, thumbnailUrl, comment, cost } = product;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 10 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <StyledProductImg alt={name} src={thumbnailUrl} />
          </Box>

          <Box
            sx={{
              height: 150,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Link color="inherit" underline="hover">
              <Typography variant="subtitle2" noWrap sx={{ width: 130 }}>
                {name}
              </Typography>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{ width: 130, mt: 0.5, mb: 1 }}
              >
                {comment}
              </Typography>
            </Link>

            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              &nbsp;
              {fCurrency(cost) + " P"}
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
