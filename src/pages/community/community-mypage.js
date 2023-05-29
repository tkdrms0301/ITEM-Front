import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Grid, Avatar } from "@mui/material";
import { BackButton } from "../../component/backButton";
import { PostsList } from "./component/postsList";
import { testBaseURL } from "./testing-String";
import { get } from "../../api/index";

export const CommunityMyPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const postQuery = `${testBaseURL}/community/user/posts`;
  const commentQuery = `${testBaseURL}/community/user/comments`;

  const [info, setInfo] = useState({});
  useEffect(() => {
    get(`${testBaseURL}/community/user/myinfo`)
      .then((response) => {
        setInfo(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bgcolor: "white",
          zIndex: 100,
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: 12,
            mt: 3,
            mb: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <BackButton />
          <Typography variant="h6" sx={{ mt: "5px" }}>
            커뮤니티 마이페이지
          </Typography>
        </Box>
        <hr style={{ marginTop: 18 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: "3%",
            py: "2%",
            borderBottom: 1,
            borderColor: "grey.500",
          }}
        >
          <Grid container>
            <Grid item container xs={8} spacing={2}>
              <Grid item xs={4}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={8}
                display="flex"
                alignItems="center"
                flexWrap="nowrap"
              >
                <Typography
                  variant="h4"
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {info.nickname}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={4}>
              <Grid item xs={12} display="flex" justifyContent="space-around">
                <Typography variant="h6">작성글 수</Typography>
                <Typography variant="h6">{info.postCount}</Typography>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-around">
                <Typography variant="h6">작성 댓글 수</Typography>
                <Typography variant="h6">{info.commentCount}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ h: "56px", borderBottom: 1, borderColor: "grey.500" }}
        >
          <Tab label="내가 쓴 글" />
          <Tab label="댓글 단 글" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 25 }}>
        {tabValue === 0 && <PostsList query={postQuery} />}
        {tabValue === 1 && <PostsList query={commentQuery} />}
      </Box>
    </>
  );
};
