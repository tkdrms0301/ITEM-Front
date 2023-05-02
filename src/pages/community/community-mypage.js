import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import { BackButton } from "../../component/backButton";
import { PostsList } from "./component/postsList";
import { tempNumberForCommentedPostingList } from "./testing-String";

export const CommunityMyPage = () => {
  const { userid } = useParams();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const postQuery = `https://dummyjson.com/posts/user/${userid}`;
  // const commentQuery = `https://dummyjson.com/posts/user/${tempNumberForCommentedPostingList}`;
  const postQuery = `https://68261330-f21c-4897-aa3f-cb6314ec6656.mock.pstmn.io/api/posts/user/${userid}`;
  const commentQuery = `https://68261330-f21c-4897-aa3f-cb6314ec6656.mock.pstmn.io/api/posts/user/${tempNumberForCommentedPostingList}`;

  console.log("userid : " + userid);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bgcolor: "white",
          zIndex: 100,
          maxWidth: "sm",
          width: "100%",
        }}
      >
        <Box
          sx={{ height: "56px", mb: -1, display: "flex", alignItems: "center" }}
        >
          <BackButton />
        </Box>
        <Box sx={{ h: "88px" }}>
          <hr />
          <h1 style={{ paddingLeft: "10px" }}>커뮤니티 마이페이지</h1>
          <hr />
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ h: "56px" }}
        >
          <Tab label="내가 쓴 글" />
          <Tab label="댓글 단 글" />
        </Tabs>
      </Box>
      <Box sx={{ mt: "200px" }}>
        {tabValue === 0 && <PostsList query={postQuery} />}
        {tabValue === 1 && <PostsList query={commentQuery} />}
      </Box>
    </>
  );
};
