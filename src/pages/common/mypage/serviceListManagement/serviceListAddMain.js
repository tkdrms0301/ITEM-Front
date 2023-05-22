import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ServiceListPanelHeader } from "./serviceListPanelHeader";
import { useRef, useState } from "react";
import { post } from "../../../../api";

export const ServiceListAddMain = () => {
  const [serviceType, setServivceType] = useState("");
  const serviceNameRef = useRef();
  const serviceDescriptionRef = useRef();
  const servicePriceRef = useRef();

  const handleChange = (event) => {
    setServivceType(event.target.value);
  };

  const onSubmitServiceAdd = (event) => {
    let data = {
      serviceType: serviceType,
      serviceName: serviceNameRef.current.value,
      description: serviceDescriptionRef.current.value,
      servicePrice: servicePriceRef.current.value,
    };

    post("http://localhost:8080/api/repair/serviceList", data)
      .then((response) => {
        if (response.data == true)
          window.location.replace("/mypage/serviceList/panel");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const menuItem = [{ name: "교환" }, { name: "수리" }, { name: "점검" }];

  return (
    <>
      <ServiceListPanelHeader />
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2, ml: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            서비스 항목 선택
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ ml: 3, mt: 1 }}>
          <Box sx={{ minWidth: 150 }}>
            <FormControl sx={{ fontSize: "14px", width: "300px" }}>
              <InputLabel>서비스 항목</InputLabel>
              <Select
                sx={{ fontSize: "14px" }}
                value={serviceType}
                onChange={handleChange}
              >
                {menuItem.map((data, index) => (
                  <MenuItem
                    key={index}
                    sx={{ fontSize: "14px" }}
                    value={data.name}
                  >
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ mt: 25, ml: 2, mr: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            서비스 가격
          </Typography>
          <TextField
            fullWidth
            required
            variant="outlined"
            label="가격을 입력해주세요"
            sx={{ mt: 1 }}
            inputRef={servicePriceRef}
          ></TextField>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2, ml: 2, mr: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            서비스 이름
          </Typography>
          <TextField
            fullWidth
            required
            sx={{ mt: 1 }}
            inputRef={serviceNameRef}
            label="내용을 입력해주세요"
          ></TextField>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, ml: 2, mr: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            서비스 설명
          </Typography>
          <TextField
            fullWidth
            multiline
            required
            rows={8}
            sx={{ mt: 1 }}
            inputRef={serviceDescriptionRef}
            label="내용을 입력해주세요"
          ></TextField>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, ml: 2, mr: 2, mb: 2 }}>
          <Button fullWidth variant="contained" onClick={onSubmitServiceAdd}>
            등록
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
