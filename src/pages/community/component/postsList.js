import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const PostsList = ({ query }) => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [loaded, setLoaded] = useState(false);

  const fetchMorePosts = () => {
    axios
      .get(`${query}?page=${page}`)
      .then((response) => {
        const newPosts = response.data.posts;
        const hasMorePosts = response.data.hasMore;

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setHasMore(hasMorePosts);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PostListWithPage = () => {
    return (
      <List>
        {posts.map((post) => {
          if (post.image) {
            return (
              <Box key={post.id}>
                <ListItem
                  key={"i" + post.id}
                  button
                  component={Link}
                  to={`/community/post/${post.id}`}
                >
                  <Grid container>
                    <Grid item xs={8}>
                      <ListItemText
                        primary={post.title}
                        // secondary={post.body}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        component="img"
                        src={
                          "https://cdn.pixabay.com/photo/2023/04/17/15/45/comma-7932755_960_720.jpg"
                        }
                        alt={"ImageNotFound"}
                        sx={{ width: "60%", height: "60%" }}
                      />
                    </Grid>
                  </Grid>
                </ListItem>

                <Divider key={"d" + post.id} sx={{ borderBottomWidth: 3 }} />
              </Box>
            );
          } else {
            return (
              <Box key={post.id}>
                <ListItem
                  key={"i" + post.id}
                  button
                  component={Link}
                  to={`/community/post/${post.id}`}
                >
                  <ListItemText
                    primary={post.title}
                    // secondary={post.body}
                  />
                </ListItem>
                <Divider key={"d" + post.id} sx={{ borderBottomWidth: 3 }} />
              </Box>
            );
          }
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
          <b>Yay! You have seen it all</b>
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
      sx={{ mb: "56px" }}
    >
      <PostListWithPage />
    </InfiniteScroll>
  );
};
