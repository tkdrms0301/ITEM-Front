import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { MoreButton } from "./moreButton";
import { testBaseURL, userId } from "../testing-String";
import { DateView } from "./date";
import { Link } from "react-router-dom";
import { TestComments } from "../test-comment";

export const CommentsList = ({
  postId,
  onReport,
  handleOpen,
  handleReply,
  changeTargetCommentId,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([null]);
  useEffect(() => {
    axios
      .get(testBaseURL + `/community/post/${postId}/comments`)
      .then((response) => {
        setComments(response.data.data.comments);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);
  if (!loaded) {
    return <CircularProgress />;
  }

  const SingleCommentView = ({ comment, isReply }) => {
    return (
      <Box
        key={comment.id}
        sx={{
          border: "1px solid #C4C4C4",
          borderRadius: "4px",
          mt: "3%",
          mb: "-1%",
          padding: "3%",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid container item xs={12} justifyContent="space-between">
            <Grid item xs={9}>
              <Box display="flex" sx={{ width: "100%" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mr: "1%", color: "inherit", textDecoration: "none" }}
                  component={Link}
                  // to={`/community/mypage/${comment.memberId}`}
                >
                  {comment.memberName} ·
                </Typography>
                <DateView date={comment.date}/>
              </Box>
            </Grid>
            <Grid item>
              <MoreButton
                sessionUserId={userId}
                ownerId={comment.memberId}
                postId={postId}
                commentId={comment.id}
                commentContent={comment.body}
                onReport={onReport}
                handleReply={handleReply}
                changeTargetCommentId={changeTargetCommentId}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} justifyContent="space-between">
            <Grid item xs={10}>
              <Typography>{comment.content}</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              {!isReply && (
                <Button
                  onClick={() => {
                    changeTargetCommentId(comment.id);
                    handleOpen();
                  }}
                >
                  답글
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  if (comments.length === 0) {
    return (
      <Box sx={{ mt: "3%", display: "flex", justifyContent: "center" }}>
        <Typography variant="h3">댓글이 없습니다.</Typography>
      </Box>
    );
  } else {
    return (
      <>
        {comments.map((comment) => {
          const hasComments = comment.comments.length > 0;
          if (hasComments) {
            return (
              <Box key={comment.id}>
                <SingleCommentView key={comment.id} comment={comment} />
                {comment.comments.map((comment) => (
                  <Box key={comment.id} sx={{ display: "flex", ml: "2px" }}>
                    <SubdirectoryArrowRightIcon sx={{ mt: "2%" }} />
                    <SingleCommentView comment={comment} isReply={true} />
                  </Box>
                ))}
              </Box>
            );
          } else {
            return (
              <Box key={comment.id}>
                <SingleCommentView comment={comment} />
              </Box>
            );
          }
        })}
      </>
    );
  }
};
