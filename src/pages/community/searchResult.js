import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { BackButton } from "../../component/backButton";
import { PostsList } from "./component/postsList";

import { SearchBar } from "./component/searchBar";
import { testBaseURL } from "./testing-String";

export const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("search");
  const postQuery = testBaseURL + "/community/posts";
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
          sx={{ height: "56px", mb: -1, display: "flex", alignItems: "center" }}
        >
          <BackButton />
          <SearchBar></SearchBar>
        </Box>
        <hr />
      </Box>
      <Box sx={{ mt: "56px", pt: "1%" }}>
        <PostsList query={postQuery} keyword={keyword}></PostsList>
      </Box>
    </>
  );
};
