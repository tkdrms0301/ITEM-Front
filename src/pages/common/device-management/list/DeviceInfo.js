import { Grid, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import DeviceUpdate from "./DeviceUpdate";
import DevicePartInfo from "./DevicePartInfo";
import AddIcon from "@mui/icons-material/Add";
import DevicePartRegister from "./DevicePartRegister";
import { post } from "../../../../api";
import { BaseUrl } from "../../../../api/BaseUrl";

const DeviceInfo = ({ infoData }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

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

  const deviceUpdate = () => {
    // infoData 에서 값 가져오기
    // id 보내기

    // 필요한 정보
    // categoryId : 1,
    // brandId : 1,
    // productId : 1,
    alert("device update");
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
        });
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>브랜드 : {infoData.brandName}</Typography>
        </Grid>
        {infoData.productType === "FINISHED_PRODUCT" ? (
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

        {infoData.productType === "FINISHED_PRODUCT" &&
        infoData.components.length > 0
          ? infoData.components.map((partInfo, index) => (
              <DevicePartInfo partInfo={partInfo} key={index} />
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
          <Button variant="contained" onClick={updateOpenHandle}>
            수정
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={deviceDelete}>
            삭제
          </Button>
        </Grid>
        <DeviceUpdate
          updateOpen={updateOpen}
          updateCloseHandle={updateCloseHandle}
          deviceUpdate={deviceUpdate}
        />
        <DevicePartRegister
          registerOpen={registerOpen}
          registerCloseHandle={registerCloseHandle}
        />
      </Grid>
    </>
  );
};
export default DeviceInfo;
