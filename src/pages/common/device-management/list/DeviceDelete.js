import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";
const DeviceDelete = ({
  deleteOpen,
  deleteCloseHandle,
  deviceDelete,
  infoData,
}) => {
  return (
    <>
      {/* infoData에 기기 정보 포함 */}
      <Dialog open={deleteOpen} onClose={deleteCloseHandle}>
        <DialogTitle>기기 삭제</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DialogContentText>기기를 삭제하시겠습니까?</DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="contained" onClick={deleteCloseHandle}>
            취소
          </Button>
          <Button variant="contained" onClick={deviceDelete}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeviceDelete;
