import { useState } from "react";
import { AppBar, Button, Grid, TextField } from "@mui/material";

const ReplyDialog = ({
  openReply,
  handleReplyClose,
  repairShopId,
  isUpdate,
}) => {
  // const [isChild, setIsChild] = useState(commentId ? true : false);
  const replyUpdate = () => {
    const reply = "updating";
    return reply;
  };
  const [reply, setReply] = useState(isUpdate ? replyUpdate : "");

  const handleSubmit = () => {
    handleReplyClose();
    console.log("reply submitted");
    console.log(reply);
    window.location.reload();
  };

  const appBarStyle = {
    bgcolor: "#B9BDC1",
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
        sx={{ height: "100%", padding: "1%" }}>
        <Grid
          item
          xs={10}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            pr: "2%",
          }}>
          <TextField
            autoFocus
            margin="dense"
            id="reply"
            label="답글"
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
            sx={{
              height: "7vh",
              width: "100%",
              backgroundColor: "#1f497d",
            }}>
            작성
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
};
export default ReplyDialog;
