import { Grid, Box } from "@mui/material";
import { FloatingWriteButton } from "./component/FloatingWriteButton";
import { PostingCategory } from "./component/PostingCategory";
import { SearchButton } from "./component/SearchButton";
import { MyPageButton } from "./component/MyPageButton";
import { PostsList } from "./component/postsList";
import { baseURL, userId } from "./testing-String";

export const CommunityMain = () => {
  // const query = "https://dummyjson.com/posts";
  const query = baseURL + "/posts";

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
        <Grid item xs={8}>
          <PostingCategory />
        </Grid>
        <Grid item xs={2}>
          <SearchButton />
        </Grid>
        <Grid item xs={2}>
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
