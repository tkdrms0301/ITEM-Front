import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography, Grid, Avatar } from "@mui/material";
import { BackButton } from "../../component/backButton";
import { PostsList } from "./component/postsList";
import { get } from "../../api/index";
import { BaseUrl } from "../../api/BaseUrl";

export const CommunityMyPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const postQuery = `${BaseUrl}/api/community/user/posts`;
  const commentQuery = `$${BaseUrl}/api/community/user/comments`;

  const [info, setInfo] = useState({});
  useEffect(() => {
    get(`${BaseUrl}/api/community/user/myinfo`)
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
            p: 2,
            borderBottom: 1,
            borderColor: "grey.500",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={6}
              spacing={2}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mr: 2,
                }}
              />

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
            <Grid
              item
              xs={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  작성글 수 &emsp;&nbsp;{info.postCount}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  작성 댓글 수 &nbsp;{info.commentCount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "grey.500" }}
        >
          <Tab label="내가 쓴 글" />
          <Tab label="댓글 단 글" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 28 }}>
        {tabValue === 0 && <PostsList query={postQuery} />}
        {tabValue === 1 && <PostsList query={commentQuery} />}
      </Box>
    </>
  );
};
