import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import { MoreButton } from "./component/moreButton";
import { BackButton } from "../../component/backButton";
import { testBaseURL } from "./testing-String";
import { CommentsList } from "./component/commentsList";
import { ReportDialog } from "./component/reportDialog";
import { PostContent } from "./component/postContent";
import { ReplyDialog } from "./component/replyDialog";
import { get } from "../../api";

export const SinglePostView = () => {
  //report
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportTarget, setReportTarget] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reportComment, setReportComment] = useState("");

  const handleReportCancel = () => {
    setShowReportDialog(false);
    setReportType("");
    setReportTarget("");
    setReportReason("");
    setReportComment("");
  };

  const handleReportSubmit = (report) => {
    setShowReportDialog(false);
    setReportType("");
    setReportTarget("");
    setReportReason("");
    setReportComment("");
  };
  const handleReportDialogOpen = (report) => {
    setShowReportDialog(true);
    setReportType(report.type);
    setReportTarget(report.target);
  };
  //report end

  //reply dialog
  const [open, setOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState(null);
  const changeTargetCommentId = (commentId) => {
    setTargetCommentId(commentId);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTargetCommentId(null);
    setTargetCommentContent("");
    isNotUpdating();
    setOpen(false);
  };

  const [isUpdate, setIsUpdate] = useState(false);

  const isUpdating = () => {
    setIsUpdate(true);
  };

  const isNotUpdating = () => {
    setIsUpdate(false);
  };
  const handleReply = () => {
    isUpdating();
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      const textField = document.getElementById("reply");
      textField.focus();
    }
  }, [open]);

  //reply dialog end
  const { postid } = useParams();

  const [post, setPost] = useState(null);
  useEffect(() => {
    get(`${testBaseURL}/community/post/${postid}`)
      .then((response) => {
        setPost(response.data.data);
        setLoaded(true);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [postid]);
  const [sessionId, setSessionId] = useState(null);
  useEffect(() => {
    get(`${testBaseURL}/member/info`)
      .then((response) => {
        setSessionId(response.data.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // load moreButton

  // load comments

  const [targetCommentContent, setTargetCommentContent] = useState("");
  useEffect(() => {
    if (targetCommentId === null) return;
    get(`${testBaseURL}/community/post/${postid}/comments`)
      .then((response) => {
        const content = response.data.data.comments.find(
          (comment) => comment.id === targetCommentId
        );
        setTargetCommentContent(content.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [targetCommentId]);
  // load comments end

  const [loaded, setLoaded] = useState(false);

  const MoreButtonForPost = () => {
    if (!loaded) {
      return <MoreButton />;
    } else
      return (
        <MoreButton
          sessionUserId={sessionId}
          ownerId={post.memberId}
          postId={postid}
          onReport={handleReportDialogOpen}
        />
      );
  };
  // load moreButton end

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: -1,
          height: "56px",
          position: "fixed",
          backgroundColor: "white",
          maxWidth: "sm",
          zIndex: 100,
        }}
      >
        <Grid item sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <BackButton />
          </Box>
        </Grid>
        <Grid item>
          <MoreButtonForPost />
        </Grid>
        <Grid item xs={12} sx={{ mt: -1 }}>
          <hr />
        </Grid>
      </Grid>
      <Box onClick={open ? handleClose : null} sx={{ mt: "56px" }}>
        <Box sx={{ padding: "3%" }}>
          <PostContent postId={postid} post={post} />
        </Box>
        <hr />
        <Box sx={{ padding: "3%" }}>
          <Button
            onClick={handleOpen}
            variant="contained"
            fullWidth={true}
            sx={{ mb: "3%" }}
          >
            댓글 작성
          </Button>
          <CommentsList
            postId={postid}
            onReport={handleReportDialogOpen}
            handleOpen={handleOpen}
            handleReply={handleReply}
            changeTargetCommentId={changeTargetCommentId}
          />
        </Box>
      </Box>
      {showReportDialog && (
        <ReportDialog
          reportType={reportType}
          reportReason={reportReason}
          reportTarget={reportTarget}
          reportComment={reportComment}
          onReportCancel={handleReportCancel}
          onReportSubmit={handleReportSubmit}
        />
      )}
      {open && (
        <ReplyDialog
          postId={postid}
          commentId={targetCommentId}
          commentContent={targetCommentContent}
          onHandleClose={handleClose}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      )}
    </>
  );
};
