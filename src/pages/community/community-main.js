import { Grid, Box } from "@mui/material";
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
      <Grid
        container
        sx={{
          position: "fixed",
          backgroundColor: "black",
          height: 3,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Grid item xs={8} sx={{ height: "100%" }}>
          <SearchBar url={"/community/search"} />
        </Grid>
        <Grid item xs={4}>
          <MyPageButton userId={userId} />
        </Grid>
        <Grid item xs={12} sx={{ mt: -1 }}>
          <hr />
        </Grid>
      </Grid>
      <Box sx={{ mt: 7 }}>
        <PostsList query={query} />
      </Box>
    </>
  );
};
