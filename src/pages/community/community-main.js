import { Box } from "@mui/material";
import { FloatingWriteButton } from "./component/FloatingWriteButton";
import { MyPageButton } from "./component/MyPageButton";
import { PostsList } from "./component/postsList";
import { SearchBar } from "./component/searchBar";
import { BaseUrl } from "../../api/BaseUrl";

export const CommunityMain = () => {
  const query = `${BaseUrl}` + "/api/community/posts";
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
        <MyPageButton />
      </Box>
      <Box sx={{ mt: 10 }}>
        <PostsList query={query} />
      </Box>
    </>
  );
};
