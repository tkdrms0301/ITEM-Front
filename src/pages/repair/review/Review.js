import { Box, Button, Grid, Typography } from "@mui/material";
import { MoreButton } from "./component/moreButton";

const Review = ({
  changeTargetCommentId,
  openReply,
  sessionId,
  handleReplyOpen,
  handleReplyClose,
  reportInfo,
  handleReportOpen,
  comment,
  isReply,
  setReportInfo,
}) => {
  return (
    <Box
      key={comment.id}
      sx={{
        border: "1px solid #C4C4C4",
        borderRadius: "4px",
        padding: 3,
      }}>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}>
            <Grid item xs={10}>
              <Typography variant="subtitle1" fontWeight="bold" align="left">
                {comment.user.username}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <MoreButton
                // sessionUserId={userId}
                ownerId={comment.user.id}
                // postId={postId}
                commentId={comment.id}
                shopId={comment.shopId}
                handleReportOpen={handleReportOpen}
                setReportInfo={setReportInfo}
                commentContent={comment.body}
                sessionId={sessionId}
                // sessionUserId={userId}
                // onReport={onReport}
                // handleReply={handleReply}
                // changeTargetCommentId={changeTargetCommentId}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="flex-end"
            justifyContent="space-between"
            spacing={1}>
            <Grid item xs={!isReply ? 10 : 12}>
              <Typography align="left">{comment.body}</Typography>
            </Grid>
            <Grid item xs={2}>
              {!isReply && (
                <Button
                  sx={{ mb: -1 }}
                  onClick={() => {
                    changeTargetCommentId(comment.id);
                    handleReplyOpen();
                  }}>
                  답글
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Review;
