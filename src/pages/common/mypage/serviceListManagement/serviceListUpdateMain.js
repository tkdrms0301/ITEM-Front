import {
  Box,
  Button,
  Card,
  Container,
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
import { get, put } from "../../../../api";
import { useLocation } from "react-router-dom";
import palette from "../../../../theme/palette";
import typography from "../../../../theme/typography";

export const ServiceListUpdateMain = () => {
  const location = useLocation();
  const [serviceType, setServivceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servcieDescription, setServcieDescription] = useState("");
  const [servciePrice, setServciePrice] = useState(0);
  const serviceNameRef = useRef();
  const servicePriceRef = useRef();
  const serviceDescriptionRef = useRef();

  useEffect(() => {
    get("http://localhost:8080/api/repair/serviceList/info", {
      params: {
        serviceId: location.state.selectedId,
      },
    })
      .then((response) => {
        console.log(response);
        setServivceType(response.data.serviceType);
        setServiceName(response.data.serviceName);
        setServcieDescription(response.data.description);
        setServciePrice(response.data.servicePrice);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(location.state);
  }, []);

  const handleChange = (event) => {
    setServivceType(event.target.value);
  };

  const onSubmitServiceUpdate = (event) => {
    let data = {
      serviceId: location.state.selectedId,
      serviceType: serviceType,
      serviceName: serviceNameRef.current.value,
      description: serviceDescriptionRef.current.value,
      servicePrice: servicePriceRef.current.value,
    };
    put("http://localhost:8080/api/repair/serviceList/info", data)
      .then((response) => {
        if (response.data) window.location.replace("/mypage/serviceList/panel");
        else {
          window.alert("공백란이 있습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const menuItem = [{ name: "교환" }, { name: "수리" }, { name: "점검" }];

  return (
    <>
      <ServiceListPanelHeader />
      <Container>
        <Card sx={{ my: 2, px: 2 }}>
          <Grid container>
            <Grid item xs={5} sx={{ py: 2, pb: 0 }}>
              <Typography variant="h5">서비스 항목</Typography>
            </Grid>
            <Grid item xs={7} sx={{ my: 1 }}>
              <Box sx={{ minWidth: 180 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>
                    <Typography variant="subtitle2">서비스 타입</Typography>
                  </InputLabel>
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
                        <Typography variant="subtitle2">{data.name}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={5} sx={{ my: 2 }}>
              <Typography variant="h5">서비스 가격</Typography>
            </Grid>
            <Grid item xs={7} sx={{ mt: 1 }}>
              <TextField
                size="small"
                fullWidth
                required
                multiline
                maxRows={0}
                variant="outlined"
                defaultValue={servciePrice}
                inputRef={servicePriceRef}
                inputProps={{
                  fontWeight: typography.h5.fontWeight,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.h5.fontSize,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ my: 1 }}>
              <Typography variant="h5">서비스 이름</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                size="medium"
                fullWidth
                required
                multiline
                maxRows={0}
                variant="outlined"
                defaultValue={serviceName}
                inputRef={serviceNameRef}
                inputProps={{
                  fontWeight: typography.h5.fontWeight,
                  fontFamily: typography.fontFamily,
                  fontSize: typography.h5.fontSize,
                }}
              ></TextField>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="h5">서비스 설명</Typography>
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
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
              <Button
                fullWidth
                color="inherit"
                variant="contained"
                onClick={onSubmitServiceUpdate}
              >
                등록
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};
