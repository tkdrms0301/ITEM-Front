import { useState } from "react";
import { AppBar, Button, Grid, TextField } from "@mui/material";
import { get, post, put } from "../../../api/index";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../api/BaseUrl";

export const ReplyDialog = ({
  onHandleClose,
  postId,
  commentId,

  isUpdate,
  setIsUpdate,
}) => {
  const navigate = useNavigate();

  const [reply, setReply] = useState("");
  const [load, setLoad] = useState(false);
  if (isUpdate && !load) {
    get(`${BaseUrl}/api/community/post/${postId}/comments/${commentId}`)
      .then((res) => {
        setReply(res.data.data);
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = () => {
    if (reply.trim() === "") {
      alert("답글을 입력해주세요.");
      document.getElementById("reply").focus();
      return;
    }
    onHandleClose();
    let url = "";
    if (isUpdate) {
      put(
        `${BaseUrl}/api/community/post/${postId}/comment/${commentId}/update`,
        {
          content: reply,
        }
      )
        .then((res) => {
          navigate(0, { state: { focusOnComment: true } });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (commentId === null) {
      post(`${BaseUrl}/api/community/post/${postId}/comment/create`, {
        content: reply,
      })
        .then((res) => {
          navigate(0, { state: { focusOnComment: true } });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      post(
        `${BaseUrl}/api/community/post/${postId}/comment/${commentId}/create`,
        {
          content: reply,
        }
      )
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const appBarStyle = {
    backgroundColor: (theme) => theme.palette.grey[400],
    height: "20vh",
    top: "auto",
    bottom: "56px",
    borderRadius: "10px 10px 0px 0px",
    padding: "0px 5px 0px 5px",
  };

  return (
    <AppBar sx={appBarStyle}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%", padding: "1%" }}
      >
        <Grid
          item
          xs={10}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            pr: "2%",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="reply"
            label={"답글"}
            type="text"
            fullWidth
            multiline
            maxRows={5}
            onChange={(event) => {
              setReply(event.target.value);
            }}
            value={reply}
            InputProps={{ sx: { height: "18vh" } }}
            sx={{
              "& .Mui-focused": {
                color: "#1f497d",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1f497d",
              },
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              height: "7vh",
              width: "100%",
            }}
          >
            작성
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
};
