import { Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DevicePartInfo = ({ partInfo }) => {
  const handlePartDelete = () => {
    if (window.confirm("부품을 삭제하겠습니까?")) {
      console.log("부품 삭제");
      console.log(partInfo);
    }
  };
  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={10}>
          <Typography>
            {partInfo.brand} / {partInfo.product} / {partInfo.productNumber}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handlePartDelete}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DevicePartInfo;
