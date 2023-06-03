import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { get } from "../../../api/index";

export const PostsList = ({ query, keyword }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const fetchMorePosts = () => {
    let url = "";
    if (keyword) {
      url = `${query + "/search"}?page=${page}&keyword=${keyword}`;
    } else {
      url = `${query}?page=${page}`;
    }
    get(url)
      .then((response) => {
        const newPosts = response.data.data.posts;
        const hasMorePosts = response.data.data.hasMore;
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setHasMore(hasMorePosts);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(posts);

  const PostListWithPage = () => {
    return (
      <List>
        {posts.map((post, index) => {
          const isDuplicate = posts
            .slice(0, index)
            .some((prevPost) => prevPost.id === post.id);

          if (isDuplicate) {
            return null;
          }
          return (
            <Box key={post.id}>
              <ListItem
                key={"i" + post.id}
                button
                onClick={() => {
                  navigate(`/community/post/${post.id}`, {
                    state: { focusOnComment: false },
                  });
                }}
              >
                <Grid
                  container
                  sx={{ height: 75 }}
                  justifyContent="space-between"
                >
                  <Grid item container xs={6} sx={{}}>
                    <Grid item xs={12}>
                      <ListItemText
                        primary={post.title}
                        sx={{
                          width: "100%",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          wordBreak: "break-word",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", alignItems: "flex-end" }}
                    >
                      <Typography variant="caption">
                        {post.memberName} | {post.date.slice(0, 10)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {post.thumbnail && (
                      <Box
                        component="img"
                        src={post.thumbnail}
                        sx={{
                          width: 60,
                          height: 60,
                          border: "1px solid grey",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link to={`/community/post/${post.id}`}>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        variant="contained"
                        sx={{
                          minWidth: 60,
                          height: "100%",
                          // borderColor: "ButtonHighlight",
                          color: "ButtonText",
                          bgcolor: "grey.300",
                          "&.active": {
                            bgcolor: "action.selected",
                            fontWeight: "fontWeightBold",
                          },
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                      >
                        댓글
                        <br />
                        {post.commentCount}개
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider key={"d" + post.id} sx={{ borderBottomWidth: 3 }} />
            </Box>
          );
        })}
      </List>
    );
  };
  //refresh function

  // const refresh = () => {
  //   setPage(1);
  //   setPosts([]);
  //   fetchMorePosts();
  // };
  // console.log(page);
  // refresh function end

  // useEffect(() => {
  //   axios
  //     .get(props.query)
  //     .then((response) => {
  //       setPosts(response.data.posts);
  //       setLoaded(true);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // if (!loaded) {
  //   return <div>Loading...</div>;
  // }
  // console.log(posts);

  if (!loaded) {
    fetchMorePosts();
    setLoaded(true);
  }
  if (posts.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 30 }}>
        글이 없습니다.
      </Typography>
    );
  } else {
    return (
      <InfiniteScroll
        dataLength={posts.length} // Current number of posts
        next={fetchMorePosts} // Function to load more posts
        hasMore={hasMore} // Boolean indicating if there are more posts to load
        loader={
          <p style={{ textAlign: "center" }}>
            <b>Loading..</b>
          </p>
        } // Loader component
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>글 목록의 끝 입니다.</b>
          </p>
        } // Message to display when there are no more posts to load
        // refreshFunction={refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
        // sx={{ mb: "56px" }}
        scrollableTarget="scrollableDiv"
      >
        <PostListWithPage />
      </InfiniteScroll>
    );
  }
};
