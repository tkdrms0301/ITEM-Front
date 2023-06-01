import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  MenuItem,
} from "@mui/material";
import { post } from "../../../../../../api";
import { BaseUrl } from "../../../../../../api/BaseUrl";

const ReportDialog = ({
  openReport,
  reportInfo,
  handleReportInfo,
  handleReportClose,
}) => {
  const { reason, comment } = reportInfo;

  const reportSubmit = () => {
    if (window.confirm(`신고하시겠습니까 ?`)) {
      post(BaseUrl + "/api/market/reportReview", {
        id: reportInfo.commentId,
        reportType: reason,
        reason: comment,
      })
        .then((res) => {
          if (res.data.data === true) {
            alert("리뷰 신고가 완료되었습니다.");
            handleReportClose();
          } else {
            alert("이미 신고한 리뷰입니다.");
            handleReportClose();
          }
        })
        .catch((err) => {
          alert("리뷰 신고에 실패했습니다.");
          handleReportClose();
        });
    }
  };

  return (
    <>
      <Dialog open={openReport} onClose={handleReportClose} fullWidth>
        <DialogTitle>리뷰 신고</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <TextField
              name="reason"
              value={reason}
              select
              label="신고 사유"
              onChange={(e) => handleReportInfo(e)}
            >
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
