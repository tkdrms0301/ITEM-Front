import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { remove } from "../../../api/index";
import { BaseUrl } from "../../../api/BaseUrl";

export const MoreButton = (props) => {
  const navigate = useNavigate();
  const isPost = props.commentId === undefined;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    if (isPost) {
      navigate(`/community/post/${props.postId}/update`);
    } else {
      props.handleReply(props.postId, props.commentId, props.commentContent);
      props.changeTargetCommentId(props.commentId);
      handleClose();
    }
  };
  const handleDelete = () => {
    handleClose();
    const id = isPost ? props.postId : props.commentId;
    const type = isPost ? "post" : "comment";
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      let url;
      if (isPost) {
        url = BaseUrl + `/api/community/post/${id}/delete`;
      } else {
        url =
          BaseUrl + `/api/community/post/${props.postId}/comment/${id}/delete`;
      }
      remove(url)
        .then(() => {
          if (type === "post") navigate(-1);
          else window.location.reload();
        })
        .catch((error) => {
          console.error(`Error deleting ${type} ${id}: ${error}`);
        });
    }
  };

  const report = {
    type: isPost ? "post" : "comment",
    target: isPost ? props.postId : props.commentId,
  };
  const handleReport = () => {
    handleClose();
    props.onReport(report);
  };
  if (props.sessionUserId === undefined) {
    return <></>;
  }
  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {props.sessionUserId === props.ownerId && (
          <MenuItem onClick={handleUpdate}>수정</MenuItem>
        )}
        {props.sessionUserId === props.ownerId && (
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        )}
        {props.sessionUserId !== props.ownerId && (
          <MenuItem onClick={handleReport}>신고</MenuItem>
        )}
      </Menu>
    </>
  );
};
