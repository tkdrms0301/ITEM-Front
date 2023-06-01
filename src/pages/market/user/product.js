import {
  Box,
  Fab,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Button,
  ButtonGroup,
  Card,
  TextField,
} from "@mui/material";
import { Header } from "./component/header";
import Reviews from "./product/review/index";
import { productDetail } from "./testdata";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { fCurrency } from "../../data/utils/formatNumber";
import { useNavigate, useParams } from "react-router-dom";
import { commentList } from "./product/review/constant";
import { get } from "../../../api/index";
import { BaseUrl } from "../../../api/BaseUrl";

export const MarketProductPage = () => {
  const [productDetailData, setProductDetailData] = useState(null);
  const [page, setPage] = useState(1);

  const { productId } = useParams();
  useEffect(() => {
    get(BaseUrl + `/api/market/productDetail?saleProductId=${productId}`)
      .then((res) => {
        setProductDetailData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const TabsButton = () => {
    return (
      <ToggleButtonGroup value={page} exclusive fullWidth>
        <ToggleButton
          value={1}
          fullWidth
          onClick={() => {
            document.getElementById("tabs1").scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            setPage(1);
          }}
          sx={{ borderRadius: 0 }}
        >
          상품정보
        </ToggleButton>
        <ToggleButton
          value={2}
          fullWidth
          onClick={() => {
            document.getElementById("tabs1").scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            setPage(2);
          }}
          sx={{ borderRadius: 0 }}
        >
          리뷰
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };

  const Page1 = () => {
    return (
      <>
        <Grid item xs={12} sx={{}}>
          <Typography variant={"h5"}>{productDetailData.comment}</Typography>
        </Grid>
        <Grid item xs={12} sx={{}}>
          {productDetailData.imageUrls.map((image, index) => (
            <img key={index} src={image} alt=""></img>
          ))}
        </Grid>
      </>
    );
  };
  const Page2 = () => {
    return (
      <>
        <Box sx={{}}>
          <Reviews
            commentList={{
              rating: productDetailData.rating,
              reviewList: productDetailData.reviewList,
            }}
          />
        </Box>
      </>
    );
  };

  const ScrollToTop = () => {
    return (
      <Fab
        color="primary"
        size="small"
        sx={{
          position: "fixed",
          bottom: 130,
          right: 25,
          zIndex: 1000,
        }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    );
  };
  const SingleProductCart = () => {
    const [count, setCount] = useState(1);
    const [focus, setFocus] = useState(false);

    useEffect(() => {
      if (focus === false) if (count < 1) setCount(1);
    }, [focus]);
    return (
      <>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card sx={{ p: 2, width: "90%", boxShadow: 10, mb: 1 }}>
            <Grid container>
              <Grid item xs={12} sx={{}}>
                <Typography variant={"h6"} gutterBottom>
                  {productDetailData.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <ButtonGroup fullWidth variant="contained" color="grey">
                  <Button
                    size="small"
                    color="grey"
                    onClick={() => {
                      if (count > 1) setCount(count - 1);
                      else setCount(1);
                    }}
                  >
                    -
                  </Button>
                  <TextField
                    id="count"
                    size="small"
                    type="number"
                    inputProps={{
                      style: { textAlign: "center" },
                    }}
                    value={count}
                    onChange={(e) => {
                      setCount(e.target.value);
                    }}
                    onFocus={() => {
                      setFocus(true);
                    }}
                    onBlur={() => {
                      setFocus(false);
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderRadius: 0,
                        },
                      },
                    }}
                  />
                  <Button
                    size="small"
                    color="grey"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={6} sx={{ alignItems: "center" }}>
                <Typography textAlign={"end"} variant={"h6"} gutterBottom>
                  {fCurrency(productDetailData.price * count) + " P"}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </>
    );
  };

  const CheckOutBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
      <>
        <Box
          sx={{
            position: "fixed",
            bottom: 55,
            zIndex: 1000,
            width: "100%",
            backgroundColor: "whitesmoke",
            boxShadow: 10,
          }}
        >
          {open && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  mb: 1,
                }}
                onClick={() => setOpen(false)}
              >
                <KeyboardArrowDownIcon />
              </Box>
              <Box sx={{ width: "100%" }}>
                <SingleProductCart />
              </Box>
            </>
          )}
          {open ? (
            <>
              <ButtonGroup fullWidth variant="contained">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    borderRadius: 0,
                    minHeight: 50,
                  }}
                  onClick={() => {
                    window.confirm(
                      "장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?"
                    ) && navigate("/market/mypage/cart");
                  }}
                >
                  장바구니담기
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ borderRadius: 0, minHeight: 50 }}
                  onClick={() => {
                    navigate("/market/mypage/order");
                  }}
                >
                  바로구매
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <Button
                fullWidth
                variant="contained"
                sx={{ borderRadius: 0, minHeight: 50 }}
                onClick={() => setOpen(true)}
              >
                구매하기
              </Button>
            </>
          )}
        </Box>
      </>
    );
  };

  if (productDetailData === null) {
    return <></>;
  } else {
    return (
      <>
        <ScrollToTop />
        <CheckOutBar />
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <Header title={""} />
        </Box>

        <Grid
          container
          direction={"column"}
          rowSpacing={2}
          alignItems={"center"}
          // justifyContent={"center"}
          width={"100%"}
          sx={{ mt: 8, mb: 8 }}
        >
          <Grid item xs={12} sx={{ width: "90%", border: "1px solid grey" }}>
            <img src={productDetailData.thumbnailUrl} alt=""></img>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ width: "90%", display: "flex", alignItems: "center" }}
            onClick={() => {
              setPage(2);
              document.getElementById("tabs1").scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
          >
            <Rating
              value={productDetailData.rating}
              readOnly
              precision={0.1}
              sx={{ mr: 1 }}
            />
            <Typography variant={"h5"}>{productDetailData.rating}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ width: "90%", borderBottom: "1px solid grey" }}
          >
            <Typography variant={"h3"} gutterBottom>
              {productDetailData.name}
            </Typography>
            <Typography variant={"h3"} gutterBottom>
              {fCurrency(productDetailData.price) + " P"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              width: "90%",
              display: "flex",
            }}
          >
            <LocalShippingIcon sx={{ mr: 1 }} />
            <Box>
              <Typography variant={"h5"}>
                배송비 : {fCurrency(productDetailData.deliveryCost) + " P"}
              </Typography>
              <Typography variant={"h5"}>
                {productDetailData.deliveryCompany}
              </Typography>
            </Box>
          </Grid>
          <Grid item id={"tabs1"} xs={12} sx={{ width: "100%" }}>
            <TabsButton />
          </Grid>
          {page === 1 ? <Page1 /> : <Page2 />}
          <Grid item id={"tabs2"} xs={12} sx={{ width: "100%" }}>
            <TabsButton />
          </Grid>
        </Grid>

        {/* 장바구니담기 */}
      </>
    );
  }
};
