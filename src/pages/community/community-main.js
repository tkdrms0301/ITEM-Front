import { Box } from "@mui/material";
import { FloatingWriteButton } from "./component/FloatingWriteButton";
import { MyPageButton } from "./component/MyPageButton";
import { PostsList } from "./component/postsList";
import { testBaseURL, userId } from "./testing-String";
import { SearchBar } from "./component/searchBar";

export const CommunityMain = () => {
  const query = testBaseURL + "/community/posts";
  return (
    <>
      <FloatingWriteButton />
      <Box
        sx={{
          position: "fixed",
          backgroundColor: "white",
          width: "100%",
          height: 80,
          zIndex: 100,
          alignItems: "center",
          display: "flex",
          borderBottom: "1px solid #C4C4C4",
        }}
      >
        <SearchBar url={"/community/search"} />
        <MyPageButton userId={userId} />
      </Box>
      <Box sx={{ mt: 10 }}>
        <PostsList query={query} />
      </Box>
    </>
  );
};
