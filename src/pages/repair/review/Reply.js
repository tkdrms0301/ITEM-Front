import { Box, Button, Grid, Typography, Rating, Card } from "@mui/material";
import { MoreButton } from "./component/moreButton";
import { useState } from "react";

const Reply = ({
  sessionId,
  handleReplyOpen,
  handleReportOpen,
  comment,
  isReply,
  setReportInfo,
  replyInfo,
  setReplyInfo,
  shopId,
}) => {
  const handleReply = () => {
    handleReplyOpen();
    setReplyInfo({
      ...replyInfo,
      commentId: comment.id,
    });
  };

  return (
    <Card
      sx={{
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
                {comment.repairShopNickname}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <MoreButton
                ownerId={comment.repairShopNickname}
                commentId={comment.id}
                shopId={shopId}
                handleReplyOpen={handleReplyOpen}
                handleReportOpen={handleReportOpen}
                setReportInfo={setReportInfo}
                commentContent={comment.replyInfo}
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
              <Typography align="left">{comment.replyContent}</Typography>
            </Grid>
            <Grid item xs={2}>
              {!isReply &&
                JSON.parse(window.localStorage.getItem("user")).roleType ===
                  "MECHANIC" && (
                  <Button sx={{ mb: -1 }} onClick={handleReply}>
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
export default Reply;
