import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Container,
} from "@mui/material";
import { BackButton } from "./component/backButton";
import { userId } from "./testing-String";

export const PostForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { postid } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);

  //product tag
  const [products, setProducts] = useState([]);
  const [tagValue, setTagValue] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTagChange = (event, value) => {
    setTagValue(value);
  };
  //product tag end

  useEffect(() => {
    if (postid) {
      axios
        .get(`https://dummyjson.com/posts/${postid}`)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.body);
          setIsUpdating(true);
        })
        .catch((error) => {
          console.error(error);
          alert("Error fetching post. Please try again.");
        });
    }
  }, [postid]);

  // image upload
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  // image upload end

  const handleSubmit = (event) => {
    event.preventDefault();

    const submitFunction = isUpdating
      ? (post, postid) => {
          return axios.put(`https://dummyjson.com/posts/${postid}`, post, {});
        }
      : (post) => {
          return axios.post("https://dummyjson.com/posts/add", post);
        };

    submitFunction({ title, content, userId }, postid)
      .then(() => {
        console.log(tagValue, title, content, images);
        alert(isUpdating ? "Post updated." : "Post created.");
        setTagValue("");
        setTitle("");
        setContent("");
        setImages([]);
        setIsUpdating(false);
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        alert("Error submitting post. Please try again.");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            position: "fixed",
            height: "56px",
            width: "100%",
            maxWidth: "sm",
            backgroundColor: "white",
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <BackButton />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "15%", height: "70%", mr: "3%" }}
            >
              {isUpdating ? "등록" : "수정"}
            </Button>
          </Box>
          <Box sx={{ mt: -1 }}>
            <hr />
          </Box>
        </Box>
        <Container sx={{ pt: "56px", width: "100%" }}>
          <Autocomplete
            options={products}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="제품 태그" variant="outlined" />
            )}
            inputValue={tagValue}
            onInputChange={handleTagChange}
            sx={{ mt: "1%" }}
          />
          <TextField
            required
            fullWidth
            id="title"
            label="글 제목"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            sx={{ mt: "3%" }}
          />
          <TextField
            required
            fullWidth
            multiline
            rows={10}
            id="content"
            label="글 내용"
            variant="outlined"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            sx={{ mt: "3%" }}
          />
          <Box
            sx={{
              border: "1px solid #C4C4C4",
              borderRadius: "4px",
              mt: "3%",
              mb: "1%",
              padding: "3%",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {"이미지 업로드"}
            </Typography>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              multiple
            />
          </Box>
        </Container>
      </form>
    </>
  );
};
