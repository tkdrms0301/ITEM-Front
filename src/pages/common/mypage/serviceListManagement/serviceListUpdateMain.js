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
import { get, put } from "../../../../api";
import { useLocation } from "react-router-dom";

export const ServiceListUpdateMain = () => {
  const location = useLocation();
  const [serviceType, setServivceType] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [servcieDescription, setServcieDescription] = useState("");
  const serviceNameRef = useRef();
  const serviceDescriptionRef = useRef();

  useEffect(() => {
    get("http://localhost:8080/api/repair/serviceList/info", {
      params: {
        serviceId: location.state.selectedId,
      },
    })
      .then((response) => {
        console.log(response.data);
        setServivceType(response.data.serviceType);
        setServiceName(response.data.serviceName);
        setServcieDescription(response.data.description);
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
    };
    put("http://localhost:8080/api/repair/serviceList/info", data)
      .then((response) => {
        console.log(response.data);
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
            서비스 이름
          </Typography>
          <TextField
            fullWidth
            multiline
            required
            variant="outlined"
            defaultValue={serviceName}
            maxRows={0}
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
          <Button fullWidth variant="contained" onClick={onSubmitServiceUpdate}>
            등록
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
