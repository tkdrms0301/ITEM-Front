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
import { useEffect, useRef, useState } from "react";

export const ServiceListUpdateMain = () => {
  const [serviceType, setServivceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servcieDescription, setServcieDescription] = useState("");

  const serviceNameRef = useRef();
  const serviceDescriptionRef = useRef();

  useEffect(() => {
    setServivceType("소프트웨어 오류, 설치");
    setServiceName("애플 스마트폰 배터리 교체");
    setServcieDescription("애플 스마트폰 배터리 교체 입니다.");
  }, []);

  const handleChange = (event) => {
    setServivceType(event.target.value);
  };

  const onSubmitServiceAdd = (event) => {
    console.log(serviceType);
    console.log(serviceNameRef.current.value);
    console.log(serviceDescriptionRef.current.value);
  };

  const menuItem = [
    { name: "소프트웨어 오류, 설치" },
    { name: "수리" },
    { name: "점검" },
  ];

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
            서비스 이름
          </Typography>
          <TextField
            fullWidth
            required
            variant="outlined"
            defaultValue={serviceName}
            maxRows={1}
            sx={{ mt: 1 }}
            inputRef={serviceNameRef}
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
            defaultValue={servcieDescription}
            inputRef={serviceDescriptionRef}
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
