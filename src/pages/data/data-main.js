import {
  Autocomplete,
  Box,
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
import { Apps, AssignmentInd, ContactMail, Home } from "@mui/icons-material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

export const DataMain = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

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
  }, 1000);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dataList = [
    {
      productName: "RTX4090",
      relatedWord: [
        { label: "그래픽카드", value: 1300 },
        { label: "가성비", value: 1200 },
        { label: "게임", value: 1100 },
        { label: "디자인", value: 690 },
        { label: "상태", value: 580 },
        { label: "6g", value: 540 },
        { label: "가격", value: 485 },
        { label: "메인보드", value: 460 },
        { label: "지포스", value: 354 },
        { label: "성능", value: 300 },
      ],
      pos_nag: { pos: 5, nag: 1 },
    },
    {
      productName: "RTX1060",
      relatedWord: [
        { label: "그래픽카드", value: 1900 },
        { label: "가성비", value: 1130 },
        { label: "게임", value: 1100 },
        { label: "디자인", value: 690 },
        { label: "상태", value: 560 },
        { label: "6g", value: 540 },
      ],
      pos_nag: { pos: 3, nag: 1 },
    },
  ];

  const listItems = [
    {
      listIcon: <Home />,
      listText: "Home",
    },
    {
      listIcon: <AssignmentInd />,
      listText: "Resume",
    },
    {
      listIcon: <Apps />,
      listText: "Portfolio",
    },
    {
      listIcon: <ContactMail />,
      listText: "Contacts",
    },
  ];

  const [categoryList, setCategoryList] = useState([
    { id: 1, name: "노트북" },
    { id: 2, name: "태블릿" },
    { id: 3, name: "PC" },
    { id: 4, name: "휴대폰" },
  ]);
  const [brandList, setBrandList] = useState([]);
  const [productList, setProductList] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (event, value) => {
    setSelectedTags(value);
    console.log(selectedTags);
  };

  const categoryClick = (categoryId) => {
    console.log(categoryId);
    setSelectedCategoryId(categoryId);

    setBrandList([
      { id: 1, name: "삼성" },
      { id: 2, name: "LG" },
      { id: 3, name: "샤오미" },
      { id: 4, name: "애플" },
      { id: 5, name: "레노버" },
      { id: 6, name: "HP" },
      { id: 7, name: "아수스" },
      { id: 8, name: "MSI" },
    ]);
  };

  const brandCiick = (brandId) => {
    console.log(brandId);
    setSelectedBrandId(brandId);

    setProductList([
      { id: 1, name: "갤럭시A90" },
      { id: 2, name: "갤럭시A80" },
      { id: 3, name: "아이폰12" },
      { id: 4, name: "아이폰7" },
      { id: 5, name: "아이폰8" },
      { id: 6, name: "아이폰11" },
      { id: 7, name: "아이폰SE" },
    ]);
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
        <MenuList sx={{ width: "130px", borderBottom: "2px solid #f1f1f1" }}>
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

      <Typography variant="h4" sx={{ my: 5 }}>
        반갑습니다, OOO님
      </Typography>
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
        <Grid item xs={11} md={10} lg={10}>
          <Grid container>
            <Grid item xs={12}>
              <Container>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  onChange={handleTagChange}
                  value={selectedTags}
                  options={productList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="데이터를 검색하세요"
                    />
                  )}
                />
              </Container>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12} md={12} lg={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    my: 5,
                  }}
                >
                  <Typography variant="h4">데이터 분석</Typography>
                  <Typography variant="subtitle1">
                    최근 1년간의 데이터 중 검색한 단어에 대한 연관어 및
                    긍/부정도 분석 결과
                  </Typography>
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
                          chartData={data.relatedWord}
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
                          { label: "긍정적 반응", value: data.pos_nag.pos },
                          { label: "부정적 반응", value: data.pos_nag.nag },
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
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
