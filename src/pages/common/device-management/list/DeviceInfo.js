import { Grid, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import DeviceUpdate from "./DeviceUpdate";
import DeviceDelete from "./DeviceDelete";
import DevicePartInfo from "./DevicePartInfo";
import AddIcon from "@mui/icons-material/Add";
import DevicePartRegister from "./DevicePartRegister";

const DeviceInfo = ({ infoData }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const { brand, productNumber, type, part } = infoData;

  const updateOpenHandle = () => {
    setUpdateOpen(true);
  };

  const updateCloseHandle = () => {
    setUpdateOpen(false);
  };

  const deleteOpenHandle = () => {
    setDeleteOpen(true);
  };

  const deleteCloseHandle = () => {
    setDeleteOpen(false);
  };

  const registerOpenHandle = () => {
    setRegisterOpen(true);
  };

  const registerCloseHandle = () => {
    setRegisterOpen(false);
  };

  const deviceUpdate = () => {
    console.log();
    // infoData 에서 값 가져오기
    // id 보내기

    // 필요한 정보
    // categoryId : 1,
    // brandId : 1,
    // productId : 1,
    alert("device update");
  };

  const deviceDelete = () => {
    // infoData 에서 값 가져오기
    // id 보내기
    alert("device delete");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>브랜드 : {brand}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>제품 번호 : {productNumber}</Typography>
        </Grid>
        {!type ? (
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

        {!type
          ? part.map((partInfo, index) => (
              <DevicePartInfo partInfo={partInfo} key={index} />
            ))
          : null}
        {!type ? console.log(part) : null}
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
          {/* window confirm 으로 변경하기 */}
          <Button variant="contained" onClick={deleteOpenHandle}>
            삭제
          </Button>
        </Grid>
        <DeviceUpdate
          updateOpen={updateOpen}
          updateCloseHandle={updateCloseHandle}
          deviceUpdate={deviceUpdate}
        />
        <DeviceDelete
          deleteOpen={deleteOpen}
          deleteCloseHandle={deleteCloseHandle}
          deviceDelete={deviceDelete}
          infoData={infoData}
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
