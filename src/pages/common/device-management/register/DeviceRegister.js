import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeviceMenuItem from "./DeviceMenuItem";
import DeviceInput from "./DeviceInput";
import axios from "axios";
import { BaseUrl } from "../../../../api/BaseUrl";
import { get, post } from "../../../../api";

const DeviceRegister = ({
  registerOpen,
  registerCloseHandle,
  isUpdate,
  setIsUpdate,
}) => {
  const [deviceInfo, setDeviceInfo] = useState({
    brand: 0,
    category: 0,
    product: 0,
    etc: "",
  });
  const [categoryList, setCategoryList] = useState([
    { id: 0, url: null, name: "카테고리명" },
  ]);

  const [brandList, setBrand] = useState([{ id: 0, name: "브랜드명" }]);

  const [productList, setProductList] = useState([{ id: 0, name: "제품명" }]);

  const { brand, category, product, etc } = deviceInfo;

  useEffect(() => {
    setDeviceInfo({
      brand: 0,
      category: 0,
      product: 0,
      etc: "",
    });
  }, [registerOpen]);

  useEffect(() => {
    axios.get(BaseUrl + "/api/device/completion-category").then((res) => {
      setCategoryList([
        { id: 0, url: null, name: "카테고리명" },
        ...res.data.data,
      ]);
      setDeviceInfo({
        ...deviceInfo,
        brand: 0,
        product: 0,
        etc: "",
      });
    });
  }, []);

  useEffect(() => {
    axios
      .get(BaseUrl + "/api/device/completion-brand", {
        params: {
          category: category,
        },
      })
      .then((res) => {
        setBrand([{ id: 0, url: null, name: "브랜드명" }, ...res.data.data]);
      });
    setDeviceInfo({
      ...deviceInfo,
      brand: 0,
      product: 0,
      etc: "",
    });
  }, [category]);

  useEffect(() => {
    axios
      .get(BaseUrl + "/api/device/completion-product", {
        params: {
          category: category,
          brand: brand,
        },
      })
      .then((res) => {
        setProductList([{ id: 0, name: "제품명" }, ...res.data.data]);
      });
    setDeviceInfo({
      ...deviceInfo,
      product: 0,
      etc: "",
    });
  }, [brand]);

  const brandData = {
    selectName: "brand",
    selectValue: brand,
    dataList: brandList,
  };

  const categoryData = {
    selectName: "category",
    selectValue: category,
    dataList: categoryList,
  };

  const productData = {
    selectName: "product",
    selectValue: product,
    dataList: productList,
  };

  const onChangeDeviceInfo = (e) => {
    const { name, value } = e.target;
    if (name === "product") {
      setDeviceInfo({
        ...deviceInfo,
        [name]: value,
        etc: "",
      });
    } else if (name === "etc") {
      setDeviceInfo({
        ...deviceInfo,
        [name]: value,
        product: 0,
      });
    } else {
      setDeviceInfo({
        ...deviceInfo,
        [name]: value,
      });
    }
  };

  const deviceRegister = () => {
    const data = {
      categoryId: deviceInfo.category,
      brandId: deviceInfo.brand,
      productId: deviceInfo.product,
      directlyRegisterProductName: deviceInfo.etc,
    };

    if (window.confirm("등록하시겠습니까?")) {
      post(BaseUrl + "/api/device/create-device", data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.msg);
            registerCloseHandle();
            window.location.reload();
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Dialog open={registerOpen} onClose={registerCloseHandle}>
        <DialogTitle>기기 등록</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DialogContentText>
                등록할 기기의 브랜드, 카테고리, 제품명을 선택해주세요
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>카테고리명</DialogContentText>
              <DeviceMenuItem
                dataList={categoryData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangeDeviceInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>브랜드명</DialogContentText>
              <DeviceMenuItem
                dataList={brandData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangeDeviceInfo}
              />
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>제품명</DialogContentText>
              <DeviceMenuItem
                dataList={productData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangeDeviceInfo}
              />
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>기타 제품명</DialogContentText>
              <DeviceInput
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangeDeviceInfo}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button
            variant="contained"
            onClick={registerCloseHandle}
            color="inherit"
            sx={{
              color: "ButtonText",
              bgcolor: "ButtonFace",
              "&.active": {
                bgcolor: "action.selected",
                fontWeight: "fontWeightBold",
              },
            }}>
            취소
          </Button>
          <Button
            variant="contained"
            onClick={deviceRegister}
            color="inherit"
            sx={{
              color: "ButtonText",
              bgcolor: "ButtonFace",
              "&.active": {
                bgcolor: "action.selected",
                fontWeight: "fontWeightBold",
              },
            }}>
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeviceRegister;
