import { Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { post } from "../../../../api";
import { BaseUrl } from "../../../../api/BaseUrl";
import palette from "../../../../theme/palette";

const DevicePartInfo = ({ partInfo, itDeviceId, handlePartList }) => {
  const handlePartDelete = () => {
    if (window.confirm("부품을 삭제하겠습니까?")) {
      const data = {
        deviceId: itDeviceId,
      };
      post(BaseUrl + "/api/device/delete-part", data)
        .then((res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          handlePartList(itDeviceId);
        });
    }
  };

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={10}>
          <Typography
            variant="subtitle2"
            sx={{
              color: palette.grey[500],
            }}>
            {partInfo.brandName} / {partInfo.categoryName}
            <br />
            {partInfo.directlyRegisterProductName === null
              ? partInfo.productName
              : partInfo.directlyRegisterProductName}
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
