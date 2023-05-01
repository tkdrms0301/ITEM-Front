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

const reportOne = (type, target, reason, comment) => {
  console.log(`report ${type} id ${target} for ${reason} with ${comment}`);
};

export const ReportDialog = ({
  reportType,
  reportTarget,
  reportReason,
  reportComment,
  onReportCancel,
  onReportSubmit,
}) => {
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
            <MenuItem value="spam">광고성 게시글</MenuItem>
            <MenuItem value="inappropriate">부적절한 게시글</MenuItem>
            <MenuItem value="other">기타</MenuItem>
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
