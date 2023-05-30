import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

// components

import { fCurrency } from "../../../data/utils/formatNumber";
import Label from "../../../../component/label/Label";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, status } = product;

  return (
    <Card>
      <Box sx={{ pt: "90%", position: "relative" }}>
        {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            &nbsp;
            {fCurrency(price) + " P"}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
