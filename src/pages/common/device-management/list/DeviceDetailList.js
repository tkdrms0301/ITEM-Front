import {
  ListItemText,
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DeviceInfo from "./DeviceInfo";
import { useState } from "react";

const AccordionDetailList = ({ detailDatas }) => {
  const [deviceDatas, setDeviceDatas] = useState([...detailDatas]);

  const handleDeviceData = (id) => {
    const newDeviceDatas = deviceDatas.filter((deviceData) => {
      return deviceData.id !== id;
    });
    setDeviceDatas(newDeviceDatas);
  };

  return (
    <>
      <Grid container spacing={3}>
        {deviceDatas.map((deviceData, index) => (
          <Grid item xs={12} key={index}>
            <Accordion>
              <AccordionSummary>
                <Grid
                  container
                  spacing={3}
                  sx={{ display: "flex", alignItems: "center" }}>
                  <Grid item xs={3}>
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        width: "100%",
                      }}
                      alt=""
                      src={deviceData.url}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <ListItemText>
                      <Typography>{deviceData.productName}</Typography>
                    </ListItemText>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <DeviceInfo infoData={deviceData} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default AccordionDetailList;
