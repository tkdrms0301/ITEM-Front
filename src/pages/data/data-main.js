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

export const DataMain = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([
    { id: 1, name: "컴퓨터" },
    { id: 2, name: "노트북" },
    { id: 3, name: "휴대폰" },
    { id: 4, name: "태블릿" },
  ]);

  const [brandList, setBrandList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const textFieldRef = useRef(null); // Create a ref for the Autocomplete TextField
  const [seachKeywordList, setSeachKeywordList] = useState([]);

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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const categoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);

    get(BaseUrl + "/api/device/completion-brand", {
      params: {
        category: categoryId,
      },
    })
      .then((res) => {
        setBrandList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const brandCiick = (brandId) => {
    setSelectedBrandId(brandId);

    get(BaseUrl + "/api/device/completion-product", {
      params: {
        category: selectedCategoryId,
        brand: brandId,
      },
    })
      .then((res) => {
        setProductList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

    setOpen(false);
    textFieldRef.current.click();
    textFieldRef.current.focus();
  };

  //검색어 추가 함수
  const handleSearchKeyword = (event, value) => {
    setSeachKeywordList(value);
  };

  //제품 선택 함수
  const handleProductChange = (event, value) => {
    setSelectedProductList(value);
  };

  const onClickFinalSearch = () => {
    console.log("최종 선택 키워드");
    const selectedTagIds = selectedProductList.map((product) => product.id);
    console.log(selectedTagIds);
    console.log(seachKeywordList);

    const data = {
      words: seachKeywordList,
      products: selectedTagIds,
    };

    post(BaseUrl + "/api/data/get", data)
      .then((res) => {
        console.log(res);
        setDataList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const convertExcel = () => {
    console.log("엑셀파일 요청");
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
          빅데이터로 찾는 IT기기 정보
        </Typography>
      ) : (
        <Typography variant="h4" sx={{ my: 5 }}>
          사람들의 생각이 궁금할때, 빅데이터로 찾는 IT기기 정보
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
                      {...params}
                      variant="filled"
                      label="검색어를 입력하세요"
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
                            chartData={data.relatedWords}
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
                          chartData={[
                            {
                              label: "긍정적 반응",
                              value: data.posAndNegDto.positive,
                            },
                            {
                              label: "부정적 반응",
                              value: data.posAndNegDto.negative,
                            },
                          ]}
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
            ) : (
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="h4" sx={{ mt: 10 }}>
                  찾으시는 제품에 대한 결과가 없습니다.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
