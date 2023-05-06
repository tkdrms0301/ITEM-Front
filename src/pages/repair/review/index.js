import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { commentList, shopId } from "./constant";

import Review from "./Review";
import ReportDialog from "./component/reportDialog";
import ReplyDialog from "./component/replyDialog";

const Reviews = () => {
  const sessionId = 73; // 현재 접속중인 사용자 id

  const [comments, setComments] = useState([...commentList]);

  //report
  const [openReport, setOpenReport] = useState(false);

  const [reportInfo, setReportInfo] = useState({
    reason: "",
    comment: "",
    commentId: 0,
    shopId: shopId,
    ownerId: 0,
    sessionId: sessionId,
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
    shopId: shopId,
    sessionId: sessionId,
    isUpdate: false,
    isComment: false,
  });

  const handleReplyOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      commentId: 0,
      isUpdate: false,
      isComment: false,
    });
  };

  const handleCommentOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      reply: "",
      isUpdate: false,
      isComment: true,
    });
  };

  const handleReplyClose = () => {
    setOpenReply(false);
    setReplyInfo({
      ...replyInfo,
      reply: "",
      commentId: 0,
      isUpdate: false,
      isComment: false,
    });
  };

  useEffect(() => {
    if (openReply) {
      const textField = document.getElementById("reply");
      textField.focus();
    }
  }, [openReply]);

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
            onClick={handleCommentOpen}>
            댓글 작성
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            {comments.map((comment, index) => {
              if (comment.comments.length > 0) {
                return (
                  <Grid item key={index} xs={11}>
                    <Review
                      comment={comment}
                      sessionId={sessionId}
                      handleReportOpen={handleReportOpen}
                      reportInfo={reportInfo}
                      setReportInfo={setReportInfo}
                      replyInfo={replyInfo}
                      setReplyInfo={setReplyInfo}
                      openReply={openReply}
                      handleReplyOpen={handleReplyOpen}
                    />
                    {comment.comments.map((comment, index) => (
                      <Grid
                        container
                        justifyContent="center"
                        sx={{ mt: 2 }}
                        key={index}>
                        <Grid item xs={1} sx={{ mt: -1 }}>
                          <SubdirectoryArrowRightIcon />
                        </Grid>
                        <Grid item xs={11}>
                          <Review
                            comment={comment}
                            isReply={true}
                            sessionId={sessionId}
                            handleReportOpen={handleReportOpen}
                            setReportInfo={setReportInfo}
                            replyInfo={replyInfo}
                            setReplyInfo={setReplyInfo}
                            openReply={openReply}
                            handleReplyOpen={handleReplyOpen}
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
                      sessionId={sessionId}
                      setReportInfo={setReportInfo}
                      replyInfo={replyInfo}
                      setReplyInfo={setReplyInfo}
                      handleReplyOpen={handleReplyOpen}
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
          handleReplyClose={handleReplyClose}
          replyInfo={replyInfo}
          setReplyInfo={setReplyInfo}
        />
      )}
    </>
  );
};
export default Reviews;
