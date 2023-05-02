import { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { userName } from "../testing-String";
import { DateView } from "./date";
import { Link } from "react-router-dom";

export const PostContent = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/posts/${postId}`)
      .then((response) => {
        setPost(response.data);
        setImages(response.data.images);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);
  // if (!loaded) {
  //   return <CircularProgress />;
  // }
  console.log("post.userId:", post.userId);
  return (
    <>
      <Typography variant="h5">{post.title}</Typography>
      <Box display="flex" justifyContent="flex-end">
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mr: "1%", color: "inherit", textDecoration: "none" }}
          component={Link}
          to={`/community/mypage/${post.userId}`}
        >
          {userName} ·
        </Typography>
        <DateView />
      </Box>
      <hr />
      <Typography variant="body1">{post.body}</Typography>
      {images &&
        images.map((image, index) => (
          <img key={index} src={image.url} alt={"ImageNotFound"} />
        ))}
    </>
  );
};
