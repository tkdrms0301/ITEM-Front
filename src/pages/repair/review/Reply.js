import { Grid, Typography, Card } from "@mui/material";
import { MoreButton } from "./component/moreButton";

const Reply = ({
  sessionId,
  handleReportOpen,
  comment,
  isReply,
  setReportInfo,
  replyInfo,
  setReplyInfo,
  shopId,
  handleUpdateCommentOpen,
  handleUpdateReplyOpen,
}) => {
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
            <Grid item xs={10}>
              <Typography variant="subtitle1" fontWeight="bold" align="left">
                {comment.repairShopNickname}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <MoreButton
                ownerId={comment.repairShopNickname}
                shopId={shopId}
                handleReportOpen={handleReportOpen}
                handleUpdateCommentOpen={handleUpdateCommentOpen}
                handleUpdateReplyOpen={handleUpdateReplyOpen}
                replyInfo={replyInfo}
                setReplyInfo={setReplyInfo}
                setReportInfo={setReportInfo}
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
            <Grid item xs={12}>
              <Typography align="left">{comment.replyContent}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default Reply;
