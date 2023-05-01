import * as React from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AccordionDetailList from "./DeviceDetailList";

const AccordionList = ({ data, registerOpenHandle, registerCloseHandle }) => {
  const datas = [...data];

  return (
    <>
      <Grid container spacing={3}>
        {datas.map((data, index) => (
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
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const DeviceList = ({ data, registerOpenHandle, registerCloseHandle }) => {
  return (
    <>
      <AccordionList
        data={data}
        registerOpenHandle={registerOpenHandle}
        registerCloseHandle={registerCloseHandle}
      />
    </>
  );
};
export default DeviceList;
