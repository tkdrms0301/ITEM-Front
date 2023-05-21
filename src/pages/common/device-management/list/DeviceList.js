import * as React from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AccordionDetailList from "./DeviceDetailList";

const AccordionList = ({
  data,
  registerOpenHandle,
  registerCloseHandle,
  isUpdate,
  setIsUpdate,
}) => {
  const datas = [...data];

  return (
    <>
      <Grid container spacing={3}>
        {datas.map((data, index) =>
          data.detail.length > 0 ? (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary>
                  <Typography>{data.summary}</Typography>
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
                  <Typography>{data.summary}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>등록된 기기가 없습니다.</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          )
        )}
      </Grid>
    </>
  );
};

const DeviceList = ({
  data,
  registerOpenHandle,
  registerCloseHandle,
  isUpdate,
  setIsUpdate,
}) => {
  return (
    <>
      <AccordionList
        data={data}
        registerOpenHandle={registerOpenHandle}
        registerCloseHandle={registerCloseHandle}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
      />
    </>
  );
};
export default DeviceList;
