import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MenuItem, Select, alpha } from "@mui/material";
import { Typography, TextField, Button, Box, Container } from "@mui/material";
import { BackButton } from "../../component/backButton";
import { get, post, put } from "../../api/index";
import { BaseUrl } from "../../api/BaseUrl";

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
    get(`${BaseUrl}/api/community/user/devices`)
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
      get(`${BaseUrl}/api/community/post/${postid}`)
        .then((response) => {
          setTitle(response.data.data.title);
          setContent(response.data.data.content);
          response.data.data.productId
            ? setTagValue(response.data.data.productId)
            : setTagValue(0);
          setImgs(response.data.data.images);
          // setImages(response.data.data.images);
          setIsUpdating(true);
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
    if (images.length + imgs.length + files.length > 10) {
      alert("이미지는 최대 10개까지 업로드 가능합니다.");
      document.getElementById("image").value = "";
      return;
    }
    files.forEach((file) => {
      if (file.size > 10485760) {
        alert("10MB 이하의 파일만 업로드 가능합니다.");
        document.getElementById("image").value = "";
        return;
      } else if (file.type === "image/svg+xml") {
        alert("svg 파일은 업로드 할 수 없습니다.");
        document.getElementById("image").value = "";
        return;
      } else {
        setImages((prevImages) => [...prevImages, file]);
      }
    });
  };
  // image upload end

  const uploadImages = async (images) => {
    const urls = [];
    imgs.map((img) => {
      urls.push(img.url);
    });
    for (const image of images) {
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
          `${BaseUrl}/api/file/file-upload`,
          data,
          config
        );
        if (response.data === "NOT_IMAGE") {
          setImages(images.filter((item) => item.name !== image.name));
          return null;
        }
        urls.push(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    if (window.confirm("등록하시겠습니까?")) {
      e.preventDefault();

      let postData;
      let urls = [];
      if (images.length > 0 || imgs.length > 0) {
        urls = await uploadImages(images);
        if (urls === null) {
          alert("이미지 파일만 업로드 가능합니다.");
          return;
        }
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
        if (title.length < 2 || content.length < 2) {
          alert("제목과 내용은 2글자 이상이어야 합니다.");
        } else if (content.length > 1000) {
          alert("내용은 1000자 이내로 작성해주세요.");
        } else {
          if (isUpdating) {
            url = `${BaseUrl}/api/community/post/${postid}/update`;
            await put(url, postData);
            setTagValue(0);
            setTitle("");
            setContent("");
            setImages([]);
            setIsUpdating(false);
            navigate(-1);
          } else {
            url = `${BaseUrl}/api/community/post/create`;
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            position: "fixed",
            height: "56px",
            width: "100%",
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
              sx={{
                width: "15%",
                height: "70%",
                mr: "3%",
                color: "ButtonText",
                bgcolor: (theme) => alpha(theme.palette.grey[400], 0.8),
                "&.active": {
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.8),
                  fontWeight: "fontWeightBold",
                },
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.8),
                },
              }}
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
            {products.map((product, index) => (
              <MenuItem key={index} value={product.productId}>
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
            <label>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                multiple
              />
            </label>
          </Box>
        </Container>
      </form>
      {imgs.length > 0 &&
        imgs.map((url, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
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
              color="error"
              sx={{
                width: "90%",
                borderRadius: "0px 0px 5px 5px",
                mb: "3%",
              }}
            >
              삭제
            </Button>
          </Box>
        ))}
      {images.length > 0 &&
        images.map((image, index) => (
          <Box
            key={index}
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
              color="error"
              sx={{
                width: "90%",
                borderRadius: "0px 0px 5px 5px",
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
