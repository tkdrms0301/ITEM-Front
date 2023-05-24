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
import { useRef, useState } from "react";
import { post } from "../../../../api";
import typography from "../../../../theme/typography";

export const ServiceListAddMain = () => {
  const [serviceType, setServivceType] = useState("수리");
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
            <Grid item xs={5} sx={{ mt: 2 }}>
              <Typography variant="h5">서비스 가격</Typography>
            </Grid>
            <Grid item xs={7} sx={{ my: 1 }}>
              <TextField
                size="small"
                fullWidth
                required
                variant="outlined"
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
                inputRef={serviceDescriptionRef}
              ></TextField>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
              <Button
                fullWidth
                color="inherit"
                variant="contained"
                onClick={onSubmitServiceAdd}
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
