import { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { post } from "../../../../../../api";
import { BaseUrl } from "../../../../../../api/BaseUrl";

export const MoreButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    props.setReportInfo({
      reason: "",
      comment: "",
      commentId: props.commentId,
      productId: props.productId,
      ownerId: props.ownerId,
    });
    props.handleReportOpen();
    handleClose();
  };

  const handleUpdate = () => {
    props.handleReplyOpen();
    props.setReplyInfo({
      ...props.replyInfo,
      reply: props.commentContent,
      rating: props.rating,
      commentId: props.commentId,
      productId: props.productId,
      ownerId: props.ownerId,
      isUpdate: true,
      isComment: !props.isReply ? true : false,
    });
    handleClose();
  };

  useEffect(() => {}, [props.replyInfo]);

  const handleDelete = () => {
    handleClose();
    const type = props.isReply ? "답글" : "리뷰";
    if (window.confirm(`${type}을 삭제하시겠습니까 ?`)) {
      post(BaseUrl + "/api/market/deleteReview", { id: props.commentId })
        .then((res) => {
          if (res.data === true) window.location.reload();
        })
        .catch((err) => {
          alert("삭제에 실패했습니다.");
        });
    }
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {props.sessionId === props.ownerId && (
          <MenuItem onClick={handleUpdate}>수정</MenuItem>
        )}
        {props.sessionId === props.ownerId && (
          <MenuItem onClick={handleDelete}>삭제</MenuItem>
        )}
        {props.sessionId !== props.ownerId && (
          <MenuItem onClick={handleReport}>신고</MenuItem>
        )}
      </Menu>
    </>
  );
};
