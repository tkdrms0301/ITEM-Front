import { useState, useEffect } from "react";
import { Button, Grid, Box, Rating, Typography } from "@mui/material";
import Review from "./Review";
import ReportDialog from "./component/reportDialog";
import ReplyDialog from "./component/replyDialog";
import { get } from "../../../../../api/index";
import { BaseUrl } from "../../../../../api/BaseUrl";
import { useParams } from "react-router-dom";

const Reviews = ({ commentList }) => {
  const [sessionId, setSessionId] = useState(null);
  useEffect(() => {
    get(BaseUrl + "/api/member/info")
      .then((res) => {
        console.log(res);
        setSessionId(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { productId } = useParams();

  const [avgRating, setAvgRating] = useState(commentList.rating);

  const [ratings, setRatings] = useState({
    r5: 0,
    r4: 0,
    r3: 0,
    r2: 0,
    r1: 0,
  });

  useEffect(() => {
    const totalCount = commentList.reviewList.length;
    setRatings({
      r5:
        (commentList.reviewList.filter((comment) => comment.rating === 5)
          .length /
          totalCount) *
        100,
      r4:
        (commentList.reviewList.filter((comment) => comment.rating === 4)
          .length /
          totalCount) *
        100,
      r3:
        (commentList.reviewList.filter((comment) => comment.rating === 3)
          .length /
          totalCount) *
        100,
      r2:
        (commentList.reviewList.filter((comment) => comment.rating === 2)
          .length /
          totalCount) *
        100,
      r1:
        (commentList.reviewList.filter((comment) => comment.rating === 1)
          .length /
          totalCount) *
        100,
    });
  }, []);

  const [comments, setComments] = useState([...commentList.reviewList]);

  //report
  const [openReport, setOpenReport] = useState(false);

  const [reportInfo, setReportInfo] = useState({
    reason: "",
    comment: "",
    commentId: 0,
    productId: productId,
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
    content: "",
    rating: 0,
    commentId: 0,
    productId: productId,
    sessionId: sessionId,
    isUpdate: false,
    isComment: false,
  });

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

  const handleCommentOpen = () => {
    setOpenReply(true);
    setReplyInfo({
      ...replyInfo,
      content: "",
      rating: 0,
      isUpdate: false,
      isComment: true,
    });
  };

  const handleReplyClose = () => {
    setOpenReply(false);
    setReplyInfo({
      ...replyInfo,
      content: "",
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

  const AvgView = ({ avg, ratingsData }) => {
    const RatingBar = (rating, percent) => {
      return (
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item xs={3}>
            <Typography variant="body2" textAlign={"end"} inline>
              {rating}점
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                width: "100%",
                height: "10px",
                backgroundColor: "#C4C4C4",
                borderRadius: "4px",
              }}
            >
              <Box
                sx={{
                  width: `${percent}%`,
                  height: "10px",
                  backgroundColor: "#FAAF00",
                  borderRadius: "4px",
                }}
              ></Box>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2" color={"lightskyblue"}>
              {Number.isNaN(percent) ? 0 : percent}%
            </Typography>
          </Grid>
        </Grid>
      );
    };
    return (
      <Grid
        container
        sx={{
          border: "1px solid #C4C4C4",
          borderRadius: "4px",
          p: 1,
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            borderRight: "1px solid #C4C4C4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              평균별점
            </Typography>
            <Typography color="#FAAF00" variant="h2">
              {avg}
            </Typography>
            <Rating value={avg} readOnly precision={0.1} sx={{ mr: 1 }} />
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ p: 2 }}>
          {RatingBar(5, ratingsData.r5)}
          {RatingBar(4, ratingsData.r4)}
          {RatingBar(3, ratingsData.r3)}
          {RatingBar(2, ratingsData.r2)}
          {RatingBar(1, ratingsData.r1)}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{ mb: 2, mt: 1 }}
        spacing={2}
        onClick={openReply ? handleReplyClose : null}
      >
        <Grid item xs={11}>
          <AvgView avg={avgRating} ratingsData={ratings} />
        </Grid>
        <Grid item xs={11}>
          <Button
            variant="contained"
            fullWidth={true}
            onClick={handleCommentOpen}
          >
            리뷰 작성
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            {comments.map(
              (comment, index) => {
                // if (comment.comments.length > 0) {
                //   return (
                //     <Grid item key={index} xs={11}>
                //       <Review
                //         comment={comment}
                //         sessionId={sessionId}
                //         handleReportOpen={handleReportOpen}
                //         reportInfo={reportInfo}
                //         setReportInfo={setReportInfo}
                //         replyInfo={replyInfo}
                //         setReplyInfo={setReplyInfo}
                //         openReply={openReply}
                //         handleReplyOpen={handleReplyOpen}
                //       />
                //       {comment.comments.map((comment, index) => (
                //         <Grid
                //           container
                //           justifyContent="center"
                //           sx={{ mt: 2 }}
                //           key={index}>
                //           <Grid item xs={1} sx={{ mt: -1 }}>
                //             <SubdirectoryArrowRightIcon />
                //           </Grid>
                //           <Grid item xs={11}>
                //             <Review
                //               comment={comment}
                //               isReply={true}
                //               sessionId={sessionId}
                //               handleReportOpen={handleReportOpen}
                //               setReportInfo={setReportInfo}
                //               replyInfo={replyInfo}
                //               setReplyInfo={setReplyInfo}
                //               openReply={openReply}
                //               handleReplyOpen={handleReplyOpen}
                //             />
                //           </Grid>
                //         </Grid>
                //       ))}
                //     </Grid>
                //   );
                // } else {
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
              // }
            )}
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
