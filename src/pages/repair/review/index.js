import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useParams } from "react-router";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { commentList } from "./constant";

import Review from "./Review";
import ReportDialog from "./component/reportDialog";
import ReplyDialog from "./component/replyDialog";

const Reviews = () => {
  const [comments, setComments] = useState([...commentList]);

  //report
  const [openReport, setOpenReport] = useState(false);

  const [reportInfo, setReportInfo] = useState({
    reason: "",
    comment: "",
    commentId: 0,
    shopId: 0,
    ownerId: 0,
  });

  const handleReportInfo = (e) => {
    const { name, value } = e.target;
    setReportInfo({
      ...reportInfo,
      [name]: value,
    });
  };

  const handleReportOpen = () => {
    setOpenReport(true);
  };

  const handleReportClose = () => {
    setOpenReport(false);
  };

  //reply dialog
  const [openReply, setOpenReply] = useState(false);

  const [replyInfo, setReplyInfo] = useState({
    reply: "",
    commentId: 0,
    shopId: 0,
    userId: 0,
  });

  const [targetCommentId, setTargetCommentId] = useState(0);
  const changeTargetCommentId = (commentId) => {
    setTargetCommentId(commentId);
  };

  const handleReplyOpen = () => {
    setOpenReply(true);
  };

  const handleReplyClose = () => {
    isNotUpdating();
    setOpenReply(false);
  };

  const [isUpdate, setIsUpdate] = useState(false);

  const isUpdating = () => {
    setIsUpdate(true);
  };

  const isNotUpdating = () => {
    setIsUpdate(false);
  };
  const handleReply = () => {
    isUpdating();
    setOpenReply(true);
  };

  useEffect(() => {
    if (openReply) {
      const textField = document.getElementById("reply");
      textField.focus();
    }
  }, [openReply]);

  const { repairShopId } = useParams();

  const sessionId = 71;

  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{ mb: 2, mt: 1 }}
        spacing={2}
        onClick={openReply ? handleReplyClose : null}>
        <Grid item xs={11}>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={handleReplyOpen}>
            댓글 작성
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            {comments.map((comment) => {
              if (comment.comments.length > 0) {
                return (
                  <Grid item key={comment.id} xs={11}>
                    <Review
                      comment={comment}
                      sessionId={sessionId}
                      handleReportOpen={handleReportOpen}
                      openReply={openReply}
                      handleReplyOpen={handleReplyOpen}
                      handleReplyClose={handleReplyClose}
                      changeTargetCommentId={changeTargetCommentId}
                      reportInfo={reportInfo}
                      setReportInfo={setReportInfo}
                    />
                    {comment.comments.map((comment) => (
                      <Grid container justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item xs={1} sx={{ mt: -1 }}>
                          <SubdirectoryArrowRightIcon />
                        </Grid>
                        <Grid item xs={11}>
                          <Review
                            comment={comment}
                            isReply={true}
                            handleReportOpen={handleReportOpen}
                            setReportInfo={setReportInfo}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                );
              } else {
                return (
                  <Grid item key={comment.id} xs={11}>
                    <Review
                      comment={comment}
                      handleReportOpen={handleReportOpen}
                      changeTargetCommentId={changeTargetCommentId}
                      handleReplyOpen={handleReplyOpen}
                      setReportInfo={setReportInfo}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Grid>
      </Grid>
      <ReportDialog
        openReport={openReport}
        reportInfo={reportInfo}
        handleReportInfo={handleReportInfo}
        handleReportClose={handleReportClose}
      />
      {openReply && (
        <ReplyDialog
          repairShopId={repairShopId}
          commentId={targetCommentId}
          openReply={openReply}
          handleReplyClose={handleReplyClose}
          isUpdate={isUpdate}
        />
      )}
    </>
  );
};
export default Reviews;
