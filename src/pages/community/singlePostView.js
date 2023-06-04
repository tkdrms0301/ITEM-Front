import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import { MoreButton } from "./component/moreButton";
import { BackButton } from "../../component/backButton";
import { CommentsList } from "./component/commentsList";
import { ReportDialog } from "./component/reportDialog";
import { PostContent } from "./component/postContent";
import { ReplyDialog } from "./component/replyDialog";
import { get } from "../../api";
import { BaseUrl } from "../../api/BaseUrl";

export const SinglePostView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state] = useState(location.state || {});
  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

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
    get(`${BaseUrl}/api/community/post/${postid}`)
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
    get(`${BaseUrl}/api/member/info`)
      .then((response) => {
        setSessionId(response.data.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // load moreButton

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

  const [focusOnComment, setFocusOnComment] = useState(
    state.focusOnComment !== undefined ? false : true
  );
  const commentsSectionRef = useRef();

  useEffect(() => {
    if (focusOnComment === true) {
      setTimeout(() => {
        scrollToComment();
      }, 300);
      setFocusOnComment(false);
    }
  }, []);

  const scrollToComment = () => {
    //alignToTop
    commentsSectionRef.current.scrollIntoView();
  };

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
        <Box ref={commentsSectionRef} sx={{ padding: "3%" }}>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="inherit"
            fullWidth={true}
            sx={{
              mb: "3%",
            }}
          >
            댓글 작성
          </Button>
          <CommentsList
            postId={postid}
            sessionId={sessionId}
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
          onHandleClose={handleClose}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      )}
    </>
  );
};
