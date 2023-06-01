import { Box, Grid, Typography, Rating } from "@mui/material";
import { MoreButton } from "./component/moreButton";
import { DateView } from "../../../../community/component/date";
import { useParams } from "react-router-dom";

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
  const { productId } = useParams();

  return (
    <Box
      sx={{
        border: "1px solid #C4C4C4",
        borderRadius: "4px",
        padding: 3,
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            {/* <Grid item xs={isReply ? 10 : 5}> */}
            <Grid
              item
              xs={10}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                align="left"
                gutturBottom
              >
                {comment.ownerName}
              </Typography>
              <Box sx={{ display: "flex", mb: 1 }}>
                <Rating
                  readOnly
                  name="simple-controlled"
                  value={comment.rating}
                  sx={{ mr: 1 }}
                />
                <DateView date={comment.date} />
              </Box>
            </Grid>
            {/* {isReply ? null : ( */}
            {/* <Grid item xs={5}>
              <Rating
                readOnly
                name="simple-controlled"
                value={comment.rating}
              />
            </Grid> */}
            {/* )} */}

            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <MoreButton
                ownerId={comment.ownerId}
                commentId={comment.id}
                productId={productId}
                handleReplyOpen={handleReplyOpen}
                handleReportOpen={handleReportOpen}
                setReportInfo={setReportInfo}
                rating={comment.rating}
                commentContent={comment.comment}
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
            spacing={1}
          >
            <Grid item xs={!isReply ? 10 : 12}>
              <Typography align="left">{comment.comment}</Typography>
            </Grid>
            <Grid item xs={2}>
              {/* {!isReply && (
                <Button sx={{ mb: -1 }} onClick={handleReply}>
                  답글
                </Button>
              )} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Review;
