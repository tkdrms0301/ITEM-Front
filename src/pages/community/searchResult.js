import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { BackButton } from "../../component/backButton";
import { PostsList } from "./component/postsList";

import { SearchBar } from "./component/searchBar";

export const SearchResult = () => {
  const postQuery =
    "https://68261330-f21c-4897-aa3f-cb6314ec6656.mock.pstmn.io/api/posts/";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search");
  console.log("searchValue:", searchValue);
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
          <SearchBar></SearchBar>
        </Box>
        <hr />
      </Box>
      <Box sx={{ mt: "56px", pt: "1%" }}>
        <PostsList query={postQuery}></PostsList>
      </Box>
    </>
  );
};
