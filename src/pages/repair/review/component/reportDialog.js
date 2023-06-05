import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { post } from "../../../../api";
import { BaseUrl } from "../../../../api/BaseUrl";

const ReportDialog = ({
  openReport,
  reportInfo,
  handleReportInfo,
  handleReportClose,
}) => {
  const { reason, reportType } = reportInfo;

  const reportSubmit = () => {
    if (window.confirm(`신고하시겠습니까 ?`)) {
      if (reportInfo.isComment) {
        console.log(reportInfo);
        const data = {
          reviewId: reportInfo.id,
          reason: reportInfo.reason,
          reportType: reportInfo.reportType,
        };
        post(BaseUrl + "/api/repair/review/report", data)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              alert(res.data.msg);
            } else {
              alert(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(reportInfo);
        const data = {
          replyId: reportInfo.id,
          reason: reportInfo.reason,
          reportType: reportInfo.reportType,
        };
        post(BaseUrl + "/api/repair/reply/report", data)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              alert(res.data.msg);
            } else {
              alert(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      handleReportClose();
    }
  };

  return (
    <>
      <Dialog open={openReport} onClose={handleReportClose} fullWidth>
        <DialogTitle>정비소 리뷰 신고</DialogTitle>
        <DialogContent>
          <Select
            sx={{ mt: 1 }}
            fullWidth
            name="reportType"
            value={reportType}
            label="신고 사유"
            onChange={(e) => handleReportInfo(e)}>
            <MenuItem value={0}>광고성 게시글</MenuItem>
            <MenuItem value={1}>부적절한 게시글</MenuItem>
            <MenuItem value={2}>기타</MenuItem>
          </Select>
          <TextField
            margin="normal"
            label="상세 사유"
            fullWidth
            multiline
            rows={4}
            name="reason"
            value={reason}
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
