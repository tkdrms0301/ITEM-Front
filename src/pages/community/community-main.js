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
          bgcolor: "white",
          height: "56px",
          maxWidth: "sm",
          zIndex: 100,
        }}
      >
        <Grid item xs={8} sx={{ height: "100%" }}>
          <SearchBar />
        </Grid>
        <Grid item xs={4}>
          <MyPageButton userId={userId} />
        </Grid>
        <Grid item xs={12} sx={{ mt: -1 }}>
          <hr />
        </Grid>
      </Grid>
      <Box sx={{ mt: "56px" }}>
        <PostsList query={query} />
      </Box>
    </>
  );
};
