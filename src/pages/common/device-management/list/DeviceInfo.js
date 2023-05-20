import { Grid, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import DeviceUpdate from "./DeviceUpdate";
import DevicePartInfo from "./DevicePartInfo";
import AddIcon from "@mui/icons-material/Add";
import DevicePartRegister from "./DevicePartRegister";
import { post } from "../../../../api";
import { BaseUrl } from "../../../../api/BaseUrl";

const DeviceInfo = ({ infoData, handleDeviceData }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [parts, setParts] = useState([...infoData.components]);

  const handlePartList = (id) => {
    const newParts = parts.filter((part) => {
      return part.id !== id;
    });
    setParts(newParts);
  };

  const handlePartListAdd = (part) => {
    setParts([...parts, part]);
  };

  const updateOpenHandle = () => {
    setUpdateOpen(true);
  };

  const updateCloseHandle = () => {
    setUpdateOpen(false);
  };

  const registerOpenHandle = () => {
    setRegisterOpen(true);
  };

  const registerCloseHandle = () => {
    setRegisterOpen(false);
  };

  const deviceDelete = () => {
    if (window.confirm("기기를 삭제하시겠습니까?")) {
      const deviceId = infoData.id;
      const data = {
        deviceId: deviceId,
      };
      post(BaseUrl + "/api/device/delete-device", data)
        .then((res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          handleDeviceData(deviceId);
        });
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>브랜드 : {infoData.brandName}</Typography>
        </Grid>
        {parts.length !== 0 ? (
          <Grid item xs={12}>
            <Grid
              container
              sx={{ display: "flex", alignItems: "center" }}
              spacing={2}>
              <Grid item xs={10}>
                <Typography>부품</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={registerOpenHandle}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ) : null}

        {parts.length !== 0
          ? parts.map((partInfo, index) => (
              <DevicePartInfo
                partInfo={partInfo}
                itDeviceId={partInfo.id}
                handlePartList={handlePartList}
                key={index}
              />
            ))
          : null}
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          mt: 1,
        }}
        spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={deviceDelete}>
            삭제
          </Button>
        </Grid>
        {/* <DeviceUpdate
          updateOpen={updateOpen}
          updateCloseHandle={updateCloseHandle}
          deviceUpdate={deviceUpdate}
        /> */}
        <DevicePartRegister
          registerOpen={registerOpen}
          registerCloseHandle={registerCloseHandle}
          handlePartListAdd={handlePartListAdd}
          itDeviceId={infoData.id}
        />
      </Grid>
    </>
  );
};
export default DeviceInfo;
