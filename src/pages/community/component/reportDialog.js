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
import { post } from "../../../api/index";
import { BaseUrl } from "../../../api/BaseUrl";

export const ReportDialog = ({
  reportType,
  reportTarget,
  reportReason,
  reportComment,
  onReportCancel,
  onReportSubmit,
}) => {
  const reportOne = (type, target, reason, comment) => {
    if (window.confirm("신고하시겠습니까?")) {
      post(`${BaseUrl}/api/community/${type}/${target}/report`, {
        reportType: reason,
        reason: comment,
      }).then((res) => {
        if (res.data.data === true) {
          alert("리뷰 신고가 완료되었습니다.");
          onReportSubmit();
        } else {
          alert("이미 신고한 리뷰입니다.");
          onReportSubmit();
        }
      })
      .catch((err) => {
        alert("리뷰 신고에 실패했습니다.");
        onReportSubmit();
      });
    }
  };

  const [reason, setReason] = useState(reportReason);
  const [comment, setComment] = useState(reportComment);

  return (
    <Dialog open={true} onClose={onReportCancel} fullWidth>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            value={reason}
            select
            label="신고 사유"
            onChange={(event) => {
              setReason(event.target.value);
            }}
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
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          type="input"
        />
      </DialogContent>
      <DialogActions sx={{ mt: -3 }}>
        <Button onClick={onReportCancel}>취소</Button>
        <Button
          onClick={() => {
            onReportSubmit();
            reportOne(reportType, reportTarget, reason, comment);
          }}
          color="primary"
        >
          신고
        </Button>
      </DialogActions>
    </Dialog>
  );
};
