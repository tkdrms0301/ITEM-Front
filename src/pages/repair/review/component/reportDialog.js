import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  MenuItem,
} from "@mui/material";

const ReportDialog = ({
  openReport,
  reportInfo,
  handleReportInfo,
  handleReportOpen,
  handleReportClose,
}) => {
  const { reason, comment } = reportInfo;

  const reportSubmit = () => {
    console.log(reportInfo);
    handleReportClose();
  };

  return (
    <>
      <Dialog open={openReport} onClose={handleReportClose} fullWidth>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              name="reason"
              value={reason}
              select
              label="신고 사유"
              onChange={(e) => handleReportInfo(e)}>
              <MenuItem value={0}>광고성 게시글</MenuItem>
              <MenuItem value={1}>부적절한 게시글</MenuItem>
              <MenuItem value={2}>기타</MenuItem>
            </TextField>
          </FormControl>
          <TextField
            margin="normal"
            label="상세 사유"
            fullWidth
            multiline
            rows={4}
            name="comment"
            value={comment}
            onChange={(e) => handleReportInfo(e)}
            type="input"
          />
        </DialogContent>
        <DialogActions sx={{ mt: -3 }}>
          <Button onClick={handleReportClose}>취소</Button>
          <Button onClick={reportSubmit} color="primary">
            신고
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ReportDialog;
