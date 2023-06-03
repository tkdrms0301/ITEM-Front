import {
  AppBar,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { post } from "../../../../../../api";
import { BaseUrl } from "../../../../../../api/BaseUrl";
import { useEffect } from "react";

const ReplyDialog = ({ handleReplyClose, replyInfo, setReplyInfo }) => {
  const handleReplySubmit = () => {
    // const type = replyInfo.isUpdate ? "수정" : "작성";
    // if (window.confirm(`답글을 ${type}하시겠습니까 ?`)) {
    //   console.log(`답글 ${type} 완료!`);
    //   handleReplyClose();
    //   console.log(replyInfo);
    //   // isUpdate
    //   // !isUpdate
    //   //window.location.reload();
    // }
  };
  useEffect(() => {
    if (!replyInfo.isUpdate) {
      setReplyInfo({
        ...replyInfo,
        reply: "",
      });
    }
  }, []);

  const handleCommentSubmit = () => {
    const type = replyInfo.isUpdate ? "수정" : "작성";
    //blank check
    if (replyInfo.reply.length < 2) {
      alert("리뷰는 2자 이상 작성해주세요.");
      return;
    }
    if (replyInfo.rating === 0) {
      alert("별점을 입력해주세요.");
      return;
    }
    if (window.confirm(`리뷰을 ${type}하시겠습니까 ?`)) {
      handleReplyClose();
      // productId / rating / content

      // isUpdate
      if (replyInfo.isUpdate) {
        post(BaseUrl + "/api/market/updateReview", {
          saleProductId: replyInfo.productId,
          rating: replyInfo.rating,
          comment: replyInfo.reply,
        })
          .then((res) => {
            if (res.data === true) window.location.reload();
          })
          .catch((err) => {
            alert("리뷰 수정에 실패했습니다.");
          });
      }

      // !isUpdate
      if (!replyInfo.isUpdate) {
        post(BaseUrl + "/api/market/registReview", {
          saleProductId: replyInfo.productId,
          rating: replyInfo.rating,
          comment: replyInfo.reply,
        })
          .then((res) => {
            if (res.data === true) window.location.reload();
            else alert("이미 리뷰를 작성한 상품입니다.");
          })
          .catch((err) => {
            alert("리뷰 작성에 실패했습니다.");
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
                  value={Number(replyInfo.rating)}
                  onChange={(e) => {
                    setReplyInfo({
                      ...replyInfo,
                      rating: e.target.value,
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
            label={replyInfo.isComment ? "리뷰" : "답글"}
            type="text"
            fullWidth
            multiline
            maxRows={5}
            onChange={(e) =>
              setReplyInfo({
                ...replyInfo,
                reply: e.target.value,
              })
            }
            value={replyInfo.reply}
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
