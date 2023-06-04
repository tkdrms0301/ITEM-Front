import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  MenuList,
  TextField,
  Typography,
  debounce,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import AppConversionRates from "./AppConversionRates";
import AppCurrentVisits from "./AppCurrentVisits";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Iconify from "../../theme/Iconify";
import { get, post } from "../../api";
import { BaseUrl } from "../../api/BaseUrl";
import { utils, writeFile } from "xlsx";
import { useNavigate } from "react-router";

export const DataMain = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const textFieldRef = useRef(null); // Create a ref for the Autocomplete TextField
  const [seachKeywordList, setSeachKeywordList] = useState([]);
  const [subscriptionState, setSubscriptionState] = useState(false);
  const scrollRef = useRef();

  const toggleSlider = () => {
    setOpen(!open);
  };
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setOpen(true);
  }, 40);

  useEffect(() => {
    get(BaseUrl + "/api/data/category")
      .then((res) => {
        console.log(res);
        setSubscriptionState(res.data.success);
        setCategoryList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const categoryClick = async (categoryId) => {
    try {
      setSelectedCategoryId(categoryId);

      const response = await get(BaseUrl + "/api/data/brand", {
        params: {
          category: categoryId,
        },
      });

      window.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });

      setBrandList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const brandCiick = (brandId) => {
    setSelectedBrandId(brandId);

    get(BaseUrl + "/api/data/product", {
      params: {
        category: selectedCategoryId,
        brand: brandId,
      },
    })
      .then((res) => {
        window.scrollTo({
          top: 10,
          behavior: "smooth",
        });
        setProductList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

    setOpen(false);
  };

  //검색어 추가 함수
  const handleSearchKeyword = (event, value) => {
    setSeachKeywordList(value);
  };

  //제품 선택 함수
  const handleProductChange = (event, value) => {
    setSelectedProductList(value);
  };

  const onClickFinalSearch = async () => {
    try {
      const selectedTagIds = selectedProductList.map((product) => product.id);
      const data = {
        words: seachKeywordList,
        products: selectedTagIds,
      };

      const response = await post(BaseUrl + "/api/data/get", data);
      setDataList(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const parseCSV = (csvString) => {
    const lines = csvString.split("\n");
    const headers = lines[0].split("|");

    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split("|");
      const obj = {};

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = values[j];
      }

      data.push(obj);
    }

    return data;
  };

  const convertExcel = async () => {
    try {
      const selectedTagIds = selectedProductList.map((product) => product.id);
      const data = {
        words: seachKeywordList,
        products: selectedTagIds,
      };

      const [responseRelated, responsePosAndNeg] = await Promise.all([
        post(BaseUrl + "/api/data/download-related-word-data", data),
        post(BaseUrl + "/api/data/download-pos-and-neg-data", data),
      ]);

      const relatedData = parseCSV(responseRelated.data);
      const posNegData = parseCSV(responsePosAndNeg.data);

      const workbook = utils.book_new();

      const relatedSheetOptions = {
        header: ["검색어", "제품명", "단어", "빈도수"],
      };
      const posNegSheetOptions = {
        header: ["검색어", "제품명", "긍정", "부정"],
      };

      const relatedWorksheet = utils.json_to_sheet(
        relatedData,
        relatedSheetOptions
      );
      const posNegWorksheet = utils.json_to_sheet(
        posNegData,
        posNegSheetOptions
      );

      utils.book_append_sheet(workbook, relatedWorksheet, "Related Data");
      utils.book_append_sheet(workbook, posNegWorksheet, "Pos and Neg Data");

      const currentDate = new Date();
      const formattedDate = currentDate
        .toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Seoul",
        })
        .replace(/[-. ]/g, "")
        .replace(/:/g, "");

      const fileName = `ITEM_Data_${formattedDate}.xlsx`;

      writeFile(workbook, fileName);
    } catch (err) {
      console.log(err);
    }
  };

  const categorySideBar = () => (
    <Box
      sx={{
        border: "2px solid #f1f1f1",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        width: "190px",
        pb: 3,
      }}
      ref={scrollRef}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "2px solid #f1f1f1",
          py: 2,
        }}
      >
        <Typography variant="h5">검색 카테고리</Typography>
        <Typography variant="subtitle2">찾으시는 제품이 있나요?</Typography>
      </Box>
      <MenuList sx={{ width: "130px", borderBottom: "2px solid #f1f1f1" }}>
        <Typography variant="h6">대분류</Typography>
        {categoryList.map((option) => (
          <MenuItem
            key={option.id}
            value={option.name}
            onClick={() => categoryClick(option.id)}
            sx={{
              backgroundColor:
                option.id === selectedCategoryId ? "#f1f1f1" : null,
            }}
          >
            <Typography variant="subtitle2">{option.name}</Typography>
          </MenuItem>
        ))}
      </MenuList>
      {brandList.length > 0 ? (
        <MenuList
          sx={{
            width: "130px",
            borderBottom: "2px solid #f1f1f1",
          }}
        >
          <Typography variant="h6">중분류</Typography>
          {brandList.map((option) => (
            <MenuItem
              key={option.id}
              value={option.name}
              onClick={() => brandCiick(option.id)}
              sx={{
                backgroundColor:
                  option.id === selectedBrandId ? "#f1f1f1" : null,
              }}
            >
              <Typography variant="subtitle2">{option.name}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      ) : null}
    </Box>
  );

  return (
    <Container>
      <CssBaseline />
      {windowSize.width < 1200 ? (
        <Typography variant="h4" sx={{ my: 5 }}>
          사람들의 생각이 궁금할때, <br />
          빅데이터로 찾는 IT기기정보
        </Typography>
      ) : (
        <Typography variant="h4" sx={{ my: 5 }}>
          사람들의 생각이 궁금할때, 빅데이터로 찾는 IT기기정보
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={1} md={2} lg={2}>
          {windowSize.width < 1200 ? (
            <Box component="nav">
              <IconButton onClick={toggleSlider} sx={{ p: 0 }}>
                <MenuIcon />
              </IconButton>
              <Drawer
                open={open}
                anchor="left"
                onClose={toggleSlider}
                PaperProps={{
                  sx: {
                    height: "calc(100% - 250px)",
                    top: 250,
                  },
                }}
              >
                {categorySideBar()}
              </Drawer>
            </Box>
          ) : (
            categorySideBar()
          )}
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Grid container>
            <Grid item xs={12}>
              <Container sx={{ display: "flex" }}>
                <Autocomplete
                  fullWidth
                  multiple
                  id="tags-standard"
                  value={selectedProductList}
                  options={productList}
                  onChange={handleProductChange}
                  ref={textFieldRef} // Assign the ref to the TextField
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      placeholder="왼쪽의 카테고리를 누른 뒤 원하시는 제품을 찾아보세요"
                    />
                  )}
                />
              </Container>
              <Container sx={{ mt: 3, display: "flex" }}>
                <Autocomplete
                  fullWidth
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  onChange={handleSearchKeyword}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      variant="standard"
                      placeholder="검색어를 입력하세요"
                    />
                  )}
                  sx={{ mr: 2 }}
                />
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={onClickFinalSearch}
                >
                  검색
                </Button>
              </Container>
            </Grid>
            {dataList.length > 0 ? (
              <Grid item xs={12}>
                <Grid item xs={12} md={12} lg={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      my: 2,
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h4">데이터 분석</Typography>
                      <Typography variant="subtitle2" sx={{ px: 1 }}>
                        최근 1년간의 데이터 중 검색한 제품에 대한 연관어 및
                        긍/부정도 분석 결과
                      </Typography>
                    </Box>
                    {windowSize.width > 1200 ? (
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={convertExcel}
                        sx={{ position: "absolute", right: 0, py: 1 }}
                      >
                        <Iconify
                          icon={"vscode-icons:file-type-excel"}
                          width={30}
                        />
                        엑셀로 변환하기
                      </Button>
                    ) : null}
                  </Box>
                  {dataList.map((data, index) => (
                    <Grid container key={index}>
                      <Grid item xs={12} md={6} lg={6}>
                        <Box
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            px: 1,
                            py: 1,
                          }}
                        >
                          <AppConversionRates
                            title={data.productName}
                            subheader="선택한 제품에 대한 연관어 언급량 결과"
                            chartData={
                              data.relatedWords ? data.relatedWords : []
                            }
                          />
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          px: 1,
                          py: 1,
                        }}
                      >
                        <AppCurrentVisits
                          title={data.productName}
                          subheader="검색한 제품에 대한 긍/부정도 분석 결과"
                          chartData={
                            data.posAndNegDto.positive
                              ? [
                                  {
                                    label: "긍정적 반응",
                                    value: data.posAndNegDto.positive,
                                  },
                                  {
                                    label: "부정적 반응",
                                    value: data.posAndNegDto.negative,
                                  },
                                ]
                              : []
                          }
                          chartColors={[
                            theme.palette.primary.main,
                            theme.palette.error.main,
                          ]}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ) : subscriptionState ? (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="h4" sx={{ mt: 10 }}>
                  찾으시는 제품에 대한 결과가 없습니다.
                </Typography>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h4" sx={{ mt: 10 }}>
                  구독 정보가 없습니다
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.72, mb: 1, mr: 2, color: "MenuText" }}
                >
                  첫 결제 시 3개월간 월 5,000원부터!
                </Typography>
                <Button variant="contained" color="inherit">
                  <Typography
                    variant="h5"
                    sx={{ opacity: 0.72, color: "MenuText" }}
                    onClick={(e) => {
                      navigate(`/mypage/subscription`);
                    }}
                  >
                    구매 하러 가기{`▶`}
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
