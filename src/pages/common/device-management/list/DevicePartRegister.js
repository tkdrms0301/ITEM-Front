import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
import DeviceMenuItem from "../register/DeviceMenuItem";
import DeviceInput from "../register/DeviceInput";
import { get, post } from "../../../../api";
import { BaseUrl } from "../../../../api/BaseUrl";
import axios from "axios";
import { useEffect } from "react";

const DevicePartRegister = ({
  registerOpen,
  registerCloseHandle,
  itDeviceId,
  isUpdate,
  setIsUpdate,
  handlePartListAdd,
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
      ...deviceInfo,
      brand: 0,
      category: 0,
      product: 0,
      etc: "",
    });
  }, [registerOpen]);

  useEffect(() => {
    get(BaseUrl + "/api/device/part-category").then((res) => {
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
    get(BaseUrl + "/api/device/part-brand", {
      params: {
        category: category,
      },
    }).then((res) => {
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
    get(BaseUrl + "/api/device/part-product", {
      params: {
        category: category,
        brand: brand,
      },
    }).then((res) => {
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

  const onChangePartInfo = (e) => {
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

  const partRegister = () => {
    const data = {
      categoryId: deviceInfo.category,
      brandId: deviceInfo.brand,
      productId: deviceInfo.product,
      directlyRegisterProductName: deviceInfo.etc,
      finishedDeviceId: itDeviceId,
    };

    if (window.confirm("등록하시겠습니까?")) {
      post(BaseUrl + "/api/device/create-part", data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.msg);
            handlePartListAdd(res.data.data);
            registerCloseHandle();
            setIsUpdate(true);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsUpdate(true);
  };

  return (
    <>
      <Dialog open={registerOpen} onClose={registerCloseHandle}>
        <DialogTitle>기기 부품 등록</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DialogContentText>
                등록할 기기 부품의 브랜드, 카테고리, 제품명을 선택해주세요
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>카테고리명</DialogContentText>
              <DeviceMenuItem
                dataList={categoryData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangePartInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>브랜드명</DialogContentText>
              <DeviceMenuItem
                dataList={brandData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangePartInfo}
              />
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>제품명</DialogContentText>
              <DeviceMenuItem
                dataList={productData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangePartInfo}
              />
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>기타 제품명</DialogContentText>
              <DeviceInput
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangePartInfo}
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
            }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={partRegister}
            color="inherit"
            sx={{
              color: "ButtonText",
              bgcolor: "ButtonFace",
              "&.active": {
                bgcolor: "action.selected",
                fontWeight: "fontWeightBold",
              },
            }}
          >
            등록
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DevicePartRegister;
