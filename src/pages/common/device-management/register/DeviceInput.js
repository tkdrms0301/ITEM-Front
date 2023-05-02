import { TextField, Box } from "@mui/material";

const DeviceInput = ({ deviceInfo, onChangeDeviceInfo }) => {
  const { brand, category, product, etc } = deviceInfo;

  function selectState() {
    if (brand !== 0 && category !== 0 && product === 0) {
      return false;
    }
    return true;
  }

  return (
    <>
      <Box
        noValidate
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <TextField
          variant="outlined"
          fullWidth
          sx={{ mt: 1 }}
          onChange={onChangeDeviceInfo}
          name="etc"
          value={etc}
          disabled={selectState()}
        />
      </Box>
    </>
  );
};
export default DeviceInput;
