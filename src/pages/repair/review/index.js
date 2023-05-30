import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { commentList } from "./constant";

import Review from "./Review";
import ReportDialog from "./component/reportDialog";
import ReplyDialog from "./component/replyDialog";
import { BaseUrl } from "../../../api/BaseUrl";
import { get, post } from "../../../api";
import Reply from "./Reply";
import { useLocation } from "react-router-dom";

const Reviews = ({ shopId }) => {
  const [sessionId, setSessionId] = useState(0); // 현재 접속중인 사용자 id
  const [comments, setComments] = useState([]);

  const location = useLocation();

  useEffect(() => {
    console.log(location.state?.shop);
  }, []);

  useEffect(() => {
    setSessionId(JSON.parse(window.localStorage.getItem("user")).name);

    get(BaseUrl + "/api/repair/review/list", {
      params: {
        page: 0,
        shopId: shopId,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setComments(res.data.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //report
  const [openReport, setOpenReport] = useState(false);

  const [reportInfo, setReportInfo] = useState({
    reason: "",
    comment: "",
    commentId: 0,
    shopId: shopId,
    ownerId: "",
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
    shopId: shopId,
    sessionId: sessionId,
    isUpdate: false,
    isComment: false,
  });

  const handleCreateCommentOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      isComment: true,
      isUpdate: false,
      content: "",
      rating: 0,
    });
  };

  const handleReplyOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      commentId: 0,
      rating: 0,
      isUpdate: false,
      isComment: false,
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
            onClick={handleCreateCommentOpen}>
            댓글 작성
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            {comments.map((comment, index) => {
              if (comment.replyId !== null) {
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
                      setOpenReply={setOpenReply}
                      handleReplyOpen={handleReplyOpen}
                    />
                    <Grid container justifyContent="center" sx={{ mt: 2 }}>
                      <Grid item xs={1} sx={{ mt: -1 }}>
                        <SubdirectoryArrowRightIcon />
                      </Grid>
                      <Grid item xs={11}>
                        <Reply
                          comment={comment}
                          isReply={true}
                          sessionId={sessionId}
                          shopId={shopId}
                          handleReportOpen={handleReportOpen}
                          setReportInfo={setReportInfo}
                          replyInfo={replyInfo}
                          setReplyInfo={setReplyInfo}
                          openReply={openReply}
                          handleReplyOpen={handleReplyOpen}
                        />
                      </Grid>
                    </Grid>
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
