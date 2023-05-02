import { FormControl, MenuItem, Select, Box } from "@mui/material";

const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5,
    },
  },
};

const DeviceMenuItem = ({ deviceInfo, dataList, onChangeDeviceInfo }) => {
  function selectState() {
    if (dataList.selectName === "category") {
      return false;
    } else if (dataList.selectName === "brand" && deviceInfo.category !== 0) {
      return false;
    } else if (
      dataList.selectName === "product" &&
      deviceInfo.category !== 0 &&
      deviceInfo.brand !== 0
    ) {
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
        <FormControl sx={{ mt: 1 }} disabled={selectState()}>
          <Select
            autoFocus
            name={dataList.selectName}
            value={dataList.selectValue}
            onChange={onChangeDeviceInfo}
            MenuProps={MenuProps}>
            {dataList.dataList.map((data, index) => {
              return (
                <MenuItem key={index} value={data.id}>
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
export default DeviceMenuItem;
