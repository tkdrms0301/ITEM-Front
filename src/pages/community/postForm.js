import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton, Menu, MenuItem, Select } from "@mui/material";
import {
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Container,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { BackButton } from "../../component/backButton";
import { testBaseURL, userId } from "./testing-String";
import { get, post, put } from "../../api/index";
import { useRef } from "react";
import { useCallback } from "react";

export const PostForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { postid } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);

  const [images, setImages] = useState([]);

  //product tag
  const [products, setProducts] = useState([]);
  const [tagValue, setTagValue] = useState(0);

  useEffect(() => {
    get(`${testBaseURL}/community/user/devices`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTagChange = (event) => {
    setTagValue(event.target.value);
  };
  //product tag end

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    if (postid) {
      get(`${testBaseURL}/community/post/${postid}`)
        .then((response) => {
          setTitle(response.data.data.title);
          setContent(response.data.data.content);
          response.data.data.productId
            ? setTagValue(response.data.data.productId)
            : setTagValue(0);
          setImgs(response.data.data.images);
          // setImages(response.data.data.images);
          setIsUpdating(true);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error(error);
          alert("Error fetching post. Please try again.");
        });
    }
  }, [postid]);

  // image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  // image upload end
  const uploadImages = async (images) => {
    const urls = [];
    imgs.map((img) => {
      urls.push(img.url);
    });
    for (const image of images) {
      console.log(image);

      const data = {
        file: image,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const response = await post(
          `${testBaseURL}/file/file-upload`,
          data,
          config
        );
        urls.push(response.data);
      } catch (error) {
        // Handle error if needed
        console.error(error);
      }
    }
    console.log(urls);
    return urls;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData;
    let urls = [];
    console.log("images:" + images);
    if (images.length > 0 || imgs.length > 0) {
      urls = await uploadImages(images);
      postData = {
        title: title,
        content: content,
        productId: tagValue,
        images: urls,
      };
    } else {
      postData = {
        title: title,
        content: content,
        productId: tagValue,
        images: [],
      };
    }
    try {
      let url;
      //title must be more than 2 characters
      if (title.length < 2 || content.length < 2) {
        alert("제목과 내용은 2글자 이상이어야 합니다.");
      } else {
        if (isUpdating) {
          url = `${testBaseURL}/community/post/${postid}/update`;
          console.log(postData);
          await put(url, postData);
          setTagValue(0);
          setTitle("");
          setContent("");
          setImages([]);
          setIsUpdating(false);
          navigate(-1);
        } else {
          url = `${testBaseURL}/community/post/create`;
          console.log(postData);
          const response = await post(url, postData);
          if (response.data.data === true) {
            setTagValue(0);
            setTitle("");
            setContent("");
            setImages([]);
            setIsUpdating(false);
            navigate(-1);
          } else {
            alert("중복 글은 등록 불가능합니다.");
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
  console.log(images);
  console.log(imgs);
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
              {isUpdating ? "수정" : "등록"}
            </Button>
          </Box>
          <Box sx={{ mt: -1 }}>
            <hr />
          </Box>
        </Box>
        <Container sx={{ pt: "56px", width: "100%" }}>
          <Select
            sx={{ mt: "3%" }}
            value={tagValue}
            onChange={handleTagChange}
            fullWidth
          >
            <MenuItem value={0}>선택</MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.productName}
              </MenuItem>
            ))}
          </Select>
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
      {imgs.length > 0 &&
        imgs.map((url) => (
          <Box
            key={url.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              key={url.id}
              src={url.url}
              alt="uploaded"
              style={{
                width: "90%",
                height: "auto",
                border: "1px solid #C4C4C4",
              }}
            />
            <Button
              onClick={() => {
                setImgs(imgs.filter((x) => x !== url));
              }}
              variant="contained"
              sx={{
                width: "90%",
                mb: "3%",
              }}
            >
              삭제
            </Button>
          </Box>
        ))}
      {images.length > 0 &&
        images.map((image) => (
          <Box
            key={image.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              key={image.name}
              src={URL.createObjectURL(image)}
              alt="uploaded"
              style={{
                width: "90%",
                height: "auto",
                border: "1px solid #C4C4C4",
              }}
            />
            <Button
              onClick={() => {
                setImages(images.filter((x) => x !== image));
              }}
              variant="contained"
              sx={{
                width: "90%",
                mb: "3%",
              }}
            >
              삭제
            </Button>
          </Box>
        ))}
    </>
  );
};
