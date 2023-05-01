import { Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import DeviceUpdate from "./DeviceUpdate";
import DeviceDelete from "./DeviceDelete";

const DeviceInfo = ({ infoData }) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
          <Typography>브랜드 : {infoData.brand}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>제품 번호 : {infoData.productNumber}</Typography>
        </Grid>
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
      </Grid>
    </>
  );
};
export default DeviceInfo;
