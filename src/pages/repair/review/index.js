import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { commentList } from "./constant";
import Review from "./Review";
import ReplyDialog from "./component/replyDialog";

const Reviews = () => {
  const [comments, setComments] = useState([...commentList]);

  //reply dialog
  const [targetCommentId, setTargetCommentId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);

  const changeTargetCommentId = (commentId) => {
    setTargetCommentId(commentId);
  };

  const isUpdating = () => {
    setIsUpdate(true);
  };

  const isNotUpdating = () => {
    setIsUpdate(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    isNotUpdating();
    setOpen(false);
  };

  const handleReply = () => {
    isUpdating();
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      const textField = document.getElementById("reply");
      textField.focus();
    }
  }, [open]);

  return (
    <>
      <Grid container justifyContent="center" sx={{ mb: 2 }} spacing={2}>
        <Grid item xs={11}>
          <Button variant="contained" fullWidth={true}>
            댓글 작성
          </Button>
        </Grid>
        {comments.map((comment) => {
          if (comment.comments.length > 0) {
            return (
              <Grid item key={comment.id} xs={11}>
                <Review comment={comment} />
                {comment.comments.map((comment) => (
                  <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={1} sx={{ mt: -1 }}>
                      <SubdirectoryArrowRightIcon />
                    </Grid>
                    <Grid item xs={11}>
                      <Review comment={comment} isReply={true} />
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            );
          } else {
            return (
              <Grid item key={comment.id} xs={11}>
                <Review comment={comment} />
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
};
export default Reviews;
