import { Box, Button, Grid, Typography, Rating } from "@mui/material";
import { MoreButton } from "./component/moreButton";
import { useState } from "react";

const Review = ({
  sessionId,
  handleReplyOpen,
  handleReportOpen,
  comment,
  isReply,
  setReportInfo,
  replyInfo,
  setReplyInfo,
}) => {
  const handleReply = () => {
    handleReplyOpen();
    setReplyInfo({
      ...replyInfo,
      commentId: comment.id,
    });
  };

  return (
    <Box
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
            <Grid item xs={isReply ? 10 : 5}>
              <Typography variant="subtitle1" fontWeight="bold" align="left">
                {comment.user.username}
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
                ownerId={comment.user.id}
                commentId={comment.id}
                shopId={comment.shopId}
                handleReplyOpen={handleReplyOpen}
                handleReportOpen={handleReportOpen}
                setReportInfo={setReportInfo}
                rating={comment.rating}
                commentContent={comment.body}
                sessionId={sessionId}
                isReply={isReply}
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
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
              <Typography align="left">{comment.body}</Typography>
            </Grid>
            <Grid item xs={2}>
              {!isReply && (
                <Button sx={{ mb: -1 }} onClick={handleReply}>
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
