import {
  AppBar,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { BaseUrl } from "../../../../api/BaseUrl";
import { post, put } from "../../../../api";

const ReplyDialog = ({ handleReplyClose, replyInfo, setReplyInfo }) => {
  const handleReplySubmit = () => {
    const type = replyInfo.isUpdate ? "수정" : "작성";
    if (window.confirm(`답글을 ${type}하시겠습니까 ?`)) {
      console.log(`답글 ${type} 완료!`);
      handleReplyClose();
      console.log(replyInfo);

      // 수정
      if (replyInfo.isUpdate) {
        const data = {
          content: replyInfo.content,
          reviewId: replyInfo.commentId,
        };
        put(BaseUrl + "/api/repair/reply/update", data)
          .then((res) => {
            if (res.data.success) {
              console.log(res.data.msg);
            } else {
              console.log(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // 작성
      else {
        const data = {
          content: replyInfo.content,
          reviewId: replyInfo.commentId,
        };

        post(BaseUrl + "/api/repair/reply/create", data)
          .then((res) => {
            if (res.data.success) {
              alert(res.data.msg);
            } else {
              alert(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      //window.location.reload();
    }
  };

  const handleCommentSubmit = () => {
    const type = replyInfo.isUpdate ? "수정" : "작성";
    if (window.confirm(`댓글을 ${type}하시겠습니까 ?`)) {
      handleReplyClose();
      console.log(replyInfo.content);
      // 수정
      if (replyInfo.isUpdate) {
        const data = {
          content: replyInfo.content,
          rating: replyInfo.rating,
          reviewId: replyInfo.commentId,
        };
        put(BaseUrl + "/api/repair/review/update", data)
          .then((res) => {
            if (res.data.success) {
              console.log(res.data.msg);
            } else {
              console.log(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // 작성
      else {
        const data = {
          content: replyInfo.content,
          rating: replyInfo.rating,
          repairShopId: replyInfo.shopId,
        };
        post(BaseUrl + "/api/repair/review/create", data)
          .then((res) => {
            if (res.data.success) {
              alert(res.data.msg);
            } else {
              alert(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      //window.location.reload();
    }
  };

  const appBarStyle = {
    bgcolor: "#DCDCDC",
    height: replyInfo.isComment ? "27vh" : "21vh",
    top: "auto",
    bottom: "56px",
    borderRadius: "10px 10px 0px 0px",
    padding: "0px 5px 0px 5px",
  };

  return (
    <AppBar sx={appBarStyle}>
      <Grid
        container
        alignItems="center"
        sx={{ height: "100%", padding: "1%" }}>
        {replyInfo.isComment && (
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              justifyContent="flex-start"
              alignItems="center">
              <Grid item>
                <Typography color="black">별점</Typography>
              </Grid>
              <Grid item>
                <Rating
                  name="rating"
                  value={replyInfo.rating}
                  onChange={(e) => {
                    setReplyInfo({
                      ...replyInfo,
                      rating: Number(e.target.value),
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid
          item
          xs={10}
          sx={{
            display: "flex",
            alignItems: "center",
            pr: "2%",
          }}>
          <TextField
            id="reply"
            autoFocus
            margin="dense"
            label={replyInfo.isComment ? "댓글" : "답글"}
            type="text"
            fullWidth
            multiline
            maxRows={5}
            onChange={(e) =>
              setReplyInfo({
                ...replyInfo,
                content: e.target.value,
              })
            }
            value={replyInfo.content}
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
            onClick={
              replyInfo.isComment ? handleCommentSubmit : handleReplySubmit
            }
            variant="contained"
            sx={{
              height: "7vh",
              width: "100%",
              backgroundColor: "#1f497d",
            }}>
            {replyInfo.isUpdate ? "수정" : "작성"}
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
};
export default ReplyDialog;
