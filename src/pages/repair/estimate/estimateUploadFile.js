import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  Button,
} from "@mui/material";
import { products } from "../data/test";
import { useRef } from "react";

export const EstimateUploadFile = ({
  data,
  uploadImgFile,
  setUploadImgFile,
  handleData,
}) => {
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadImgFile(reader.result);
    };
  };

  return (
    <Container sx={{ mt: "56px", width: "100%" }}>
      <Card
        sx={{
          mt: 9,
          mb: 2,
          boxShadow: 10,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FormControl sx={{ width: "90%", mt: 1 }}>
                <InputLabel>제품 선택</InputLabel>
                <Select
                  name="product"
                  value={data.product}
                  defaultValue={data.product}
                  onChange={handleData}
                  label="제품 선택"
                  fullWidth
                >
                  {products.map((product, index) => (
                    <MenuItem value={product.id} key={index}>
                      {product.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              mt: 2,
              backgroundColor: "ButtonHighlight",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={uploadImgFile ? uploadImgFile : "/camera-outline.svg"}
              alt="손상부위의 사진 등록"
              sx={
                uploadImgFile
                  ? { width: "80%", m: 2 }
                  : {
                      mt: 3,
                      width: "30%",
                      color: "InfoText",
                    }
              }
            />
          </Grid>
          {!uploadImgFile ? (
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "ButtonHighlight",
              }}
            >
              <Typography variant="subtitle2" sx={{ m: 2, mt: 1 }}>
                손상부위의 사진 등록을 등록하면 <br />
                수리점으로부터 예상 수리비를 받아볼 수 있습니다.
              </Typography>
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "ButtonHighlight",
              textAlign: "right",
              pr: 3,
              pb: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{
                borderRadius: "20px",
                bgcolor: "white",
                color: "ButtonText",
              }}
            >
              + 사진 추가하기
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={saveImgFile}
                ref={imgRef}
              />
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
