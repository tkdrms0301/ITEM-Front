import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { BackButton } from "../../component/backButton";
import { PostsList } from "./component/postsList";

import { SearchBar } from "./component/searchBar";
import { testBaseURL } from "./testing-String";

export const SearchResult = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("search");
  const postQuery = testBaseURL + "/community/posts";
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          backgroundColor: "white",
          height: 80,
          zIndex: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #C4C4C4",
        }}>
        <BackButton />
        <SearchBar url={"/community/search"}></SearchBar>
      </Box>
      <Box sx={{ mt: 10 }}>
        <PostsList query={postQuery} keyword={keyword}></PostsList>
      </Box>
    </>
  );
};
