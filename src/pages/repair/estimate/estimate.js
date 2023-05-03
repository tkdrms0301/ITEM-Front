import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/test";

export const Estimate = () => {
  const shopId = useParams();
  const [productImg, setProductImg] = useState("");

  //transtmit data
  const [data, setData] = useState({
    userId: 0,
    repairId: shopId,
    product: "",
    comment: "",
  });
  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    handleCompleted();
  };
  const handleSelect = (event, value) => {
    setData({
      ...data,
      product: value,
    });
    //findProductImg(value);
    setProductImg("https://i.dummyjson.com/data/products/1/1.jpg");

    handleCompleted();
  };
  //transtmit data end

  //completed
  const [completed, setCompleted] = useState({
    isCompleted: false,
    msg: "",
  });
  const handleCompleted = () => {
    if (data.product === "" || data.comment === "") {
      setCompleted({
        isCompleted: false,
        msg: "필수 정보를 모두 입력해주세요.",
      });
    } else {
      setCompleted({
        isCompleted: true,
        msg: "",
      });
    }
  };

  //completed end

  console.log(data);
  return (
    <>
      <TitleButtonBar
        title={"견적 신청"}
        buttonLabel={"신청"}
        query={""}
        transmitData={data}
        completed={completed}
      />
      <Container sx={{ mt: "56px", pt: "1%" }}>
        <Autocomplete
          options={products}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} label="제품 선택" variant="outlined" />
          )}
          inputValue={data.product}
          onInputChange={handleSelect}
          onChange={(event, value, reason) => {
            if (reason === "clear") {
              setProductImg("");
            }
          }}
          sx={{ mt: "3%" }}
        />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100px",
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            mt: "3%",
            padding: "3%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: -10,
              left: 10,
              bgcolor: "white",
              px: 1,
              fontSize: "0.8rem",
            }}
          >
            제품정보
          </Typography>
          {productImg ? (
            <Box
              component="img"
              src={productImg}
              alt={data.product}
              sx={{
                width: "40%",
                height: "100%",
                mr: "5%",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "40%",
                height: "100%",
                mr: "5%",
                bgcolor: "#8C92AC",
                borderRadius: "10px",
              }}
            ></Box>
          )}
          <Typography>{data.product}</Typography>
        </Box>

        <TextField
          name="comment"
          label="요청사항"
          value={data.comment}
          onChange={handleData}
          fullWidth
          multiline
          rows={2}
          sx={{ mt: "3%" }}
        ></TextField>
      </Container>
    </>
  );
};
