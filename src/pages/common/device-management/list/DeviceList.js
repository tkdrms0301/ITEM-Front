import * as React from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
} from "@mui/material";
import AccordionDetailList from "./DeviceDetailList";

const DeviceList = ({
  datas,
  registerOpenHandle,
  registerCloseHandle,
  isUpdate,
  setIsUpdate,
}) => {
  const newDatas = [...datas];
  return (
    <>
      <Card
        sx={{
          pb: 1,
          boxShadow: 10,
          mb: 3,
        }}>
        <Grid container spacing={3}>
          {newDatas.map((data, index) =>
            data.detail.length > 0 ? (
              <Grid item xs={12} key={index}>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="h4">{data.summary}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionDetailList
                      detailDatas={data.detail}
                      registerOpenHandle={registerOpenHandle}
                      registerCloseHandle={registerCloseHandle}
                      isUpdate={isUpdate}
                      setIsUpdate={setIsUpdate}
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ) : (
              <Grid item xs={12} key={index}>
                <Accordion>
                  <AccordionSummary>
                    <Typography variant="h4">{data.summary}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle2">
                      등록된 기기가 없습니다.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )
          )}
        </Grid>
      </Card>
    </>
  );
};
export default DeviceList;
