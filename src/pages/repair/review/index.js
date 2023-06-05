import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Review from "./Review";
import ReportDialog from "./component/reportDialog";
import ReplyDialog from "./component/replyDialog";
import { BaseUrl } from "../../../api/BaseUrl";
import { get } from "../../../api";
import Reply from "./Reply";
import InfiniteScroll from "react-infinite-scroll-component";

const Reviews = ({ shopId }) => {
  const [sessionId, setSessionId] = useState(0); // 현재 접속중인 사용자 id
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState({
    hasMore: true,
    page: 0,
  });

  useEffect(() => {}, [comments]);

  const fetchMoreComments = () => {
    get(BaseUrl + "/api/repair/review/list", {
      params: {
        page: page.page,
        shopId: shopId,
      },
    })
      .then((res) => {
        if (res.data.data.length !== 0) {
          const newComments = res.data.data.content;
          setComments((prevComments) => [...prevComments, ...newComments]);
          setPage({
            page: page.page + 1,
            hasMore: !res.data.data.last,
          });
        } else {
          setComments(res.data.data.content);
          setPage({
            page: page.page + 1,
            hasMore: !res.data.data.last,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentAdd = (comment) => {
    setComments([comment, ...comments]);
  };

  const handleCommentDelete = (commentId) => {
    const data = comments.filter((comment) => comment.reviewId !== commentId);
    setComments(data);
  };

  const handleCommentUpdate = (comment) => {
    let findIndex = comments.findIndex((c) => c.reviewId === comment.reviewId);
    let newComments = [...comments];
    newComments[findIndex].rating = comment.rating;
    newComments[findIndex].repairShopNickname = comment.repairShopNickname;
    newComments[findIndex].replyContent = comment?.replyContent;
    newComments[findIndex].replyId = comment?.replyId;
    newComments[findIndex].reviewContent = comment.reviewContent;
    newComments[findIndex].reviewId = comment.reviewId;
    newComments[findIndex].userNickname = comment.userNickname;
    setComments([...newComments]);
  };

  const handleReply = (comment) => {
    let findIndex = comments.findIndex((c) => c.reviewId === comment.reviewId);
    let newComments = [...comments];
    newComments[findIndex].replyContent = comment?.replyContent;
    newComments[findIndex].replyId = comment?.replyId;
    newComments[findIndex].repairShopNickname = comment.repairShopNickname;
    setComments(newComments);
  };

  const handleReplyDelete = (commentId) => {
    let findIndex = comments.findIndex((c) => c.reviewId === commentId);
    let newComments = [...comments];
    newComments[findIndex].replyContent = null;
    newComments[findIndex].replyId = null;
    setComments(newComments);
  };

  //report
  const [openReport, setOpenReport] = useState(false);

  const [reportInfo, setReportInfo] = useState({
    reason: "",
    reportType: 0,
    id: 0,
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

  const handleReplyClose = () => {
    setOpenReply(false);
    setReplyInfo({
      shopId: shopId,
      sessionId: sessionId,
      isUpdate: false,
      isComment: false,
    });
  };

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

  const handleUpdateCommentOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      isComment: true,
      isUpdate: false,
      content: "",
      rating: 0,
    });
  };

  const handleCreateReplyOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      commentId: 0,
      content: "",
      rating: 0,
      isUpdate: false,
      isComment: false,
    });
  };

  const handleUpdateReplyOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      commentId: 0,
      rating: 0,
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

  useEffect(() => {
    setSessionId(JSON.parse(window.localStorage.getItem("user"))?.name);

    get(BaseUrl + "/api/repair/review/list", {
      params: {
        page: 0,
        shopId: shopId,
      },
    })
      .then((res) => {
        if (res.data.data.length === 0) {
          setPage({
            page: 0,
            hasMore: false,
          });
        } else {
          setComments(res.data.data.content);
          setPage({
            page: page.page + 1,
            hasMore: !res.data.data.last,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [comments]);

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
          <InfiniteScroll
            dataLength={comments.length}
            next={fetchMoreComments}
            hasMore={page.hasMore}
            loader={
              <p style={{ textAlign: "center" }}>
                <b>Loading..</b>
              </p>
            } // Loader component
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>글 목록의 끝 입니다.</b>
              </p>
            }>
            <Grid container spacing={2} justifyContent="center">
              {comments.map((comment, index) => {
                return (
                  <Grid item key={index} xs={11}>
                    <Review
                      comment={comment}
                      sessionId={sessionId}
                      handleReportOpen={handleReportOpen}
                      reportInfo={reportInfo}
                      setReportInfo={setReportInfo}
                      openReply={openReply}
                      setOpenReply={setOpenReply}
                      isReply={false}
                      replyInfo={replyInfo}
                      setReplyInfo={setReplyInfo}
                      handleCreateCommentOpen={handleCreateCommentOpen}
                      handleUpdateCommentOpen={handleUpdateCommentOpen}
                      handleCreateReplyOpen={handleCreateReplyOpen}
                      handleCommentDelete={handleCommentDelete}
                    />
                    {comment.replyId && (
                      <Grid container justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item xs={1} sx={{ mt: -1 }}>
                          <SubdirectoryArrowRightIcon />
                        </Grid>
                        <Grid item xs={11}>
                          <Reply
                            comment={comment}
                            sessionId={sessionId}
                            shopId={shopId}
                            handleReportOpen={handleReportOpen}
                            setReportInfo={setReportInfo}
                            openReply={openReply}
                            isReply={true}
                            replyInfo={replyInfo}
                            setReplyInfo={setReplyInfo}
                            handleUpdateReplyOpen={handleUpdateReplyOpen}
                            handleCommentDelete={handleCommentDelete}
                            handleReplyDelete={handleReplyDelete}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </InfiniteScroll>
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
          handleCommentAdd={handleCommentAdd}
          handleCommentUpdate={handleCommentUpdate}
          handleReply={handleReply}
        />
      )}
    </>
  );
};
export default Reviews;
