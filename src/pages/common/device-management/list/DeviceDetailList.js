import {
  ListItemText,
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import DeviceInfo from "./DeviceInfo";
import { useEffect, useState } from "react";
import palette from "../../../../theme/palette";

const AccordionDetailList = ({ detailDatas, isUpdate, setIsUpdate }) => {
  const [deviceDatas, setDeviceDatas] = useState([...detailDatas]);

  const handleDeviceData = (id) => {
    const newDeviceDatas = deviceDatas.filter((deviceData) => {
      return deviceData.id !== id;
    });
    setDeviceDatas(newDeviceDatas);
  };

  useEffect(() => {
    setDeviceDatas([...detailDatas]);
  }, [detailDatas]);

  return (
    <>
      <Card sx={{ boxShadow: 10 }}>
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
                        <Typography
                          variant="h6"
                          sx={{
                            color: palette.grey[700],
                          }}>
                          {deviceData.directlyRegisterProductName === null
                            ? deviceData.productName
                            : deviceData.directlyRegisterProductName}
                        </Typography>
                      </ListItemText>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <DeviceInfo
                    infoData={deviceData}
                    handleDeviceData={handleDeviceData}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                  />
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
};
export default AccordionDetailList;
