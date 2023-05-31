import { Box, Button, Grid, Typography, Rating, Card } from "@mui/material";
import { MoreButton } from "./component/moreButton";

const Review = ({
  sessionId,
  handleReportOpen,
  comment,
  isReply,
  setReportInfo,
  replyInfo,
  setReplyInfo,
  setOpenReply,
  shopId,
  handleCreateCommentOpen,
  handleUpdateCommentOpen,
  handleCreateReplyOpen,
}) => {
  const handleReplyOpen = () => {
    handleCreateReplyOpen();
    setReplyInfo({
      ...replyInfo,
      isUpdate: false,
      isComment: false,
      content: "",
      commentId: comment.reviewId,
    });
  };
  return (
    <Card sx={{ borderRadius: "4px", padding: 3 }}>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}>
            <Grid item xs={isReply ? 10 : 5}>
              <Typography variant="subtitle1" fontWeight="bold" align="left">
                {comment.userNickname}
              </Typography>
            </Grid>
            {isReply ? null : (
              <Grid item xs={5}>
                <Rating
                  readOnly
                  name="simple-controlled"
                  value={comment.rating}
                />
              </Grid>
            )}

            <Grid item xs={2}>
              <MoreButton
                ownerId={comment.userNickname}
                shopId={shopId}
                handleReportOpen={handleReportOpen}
                handleUpdateCommentOpen={handleUpdateCommentOpen}
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                setReportInfo={setReportInfo}
                setOpenReply={setOpenReply}
                comment={comment}
                sessionId={sessionId}
                isReply={isReply}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="flex-end"
            justifyContent="center"
            spacing={1}>
            <Grid item xs={!isReply ? 10 : 12}>
              <Typography align="left">{comment.reviewContent}</Typography>
            </Grid>
            <Grid item xs={2}>
              {!isReply &&
                JSON.parse(window.localStorage.getItem("user")).roleType ===
                  "MECHANIC" && (
                  <Button sx={{ mb: -1 }} onClick={handleReplyOpen}>
                    답글
                  </Button>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default Review;
