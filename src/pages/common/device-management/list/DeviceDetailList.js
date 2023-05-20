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

const AccordionDetailList = ({ detailDatas }) => {
  return (
    <>
      <Grid container spacing={3}>
        {detailDatas.map((detailData, index) => (
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
                      src={detailData.url}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <ListItemText>
                      <Typography>{detailData.product}</Typography>
                    </ListItemText>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <DeviceInfo infoData={detailData} />
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default AccordionDetailList;
