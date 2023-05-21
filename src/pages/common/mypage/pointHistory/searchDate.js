import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Card,
} from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const SearchDate = ({
  firstDate,
  setFirstDate,
  secondaryDate,
  setSecondaryDate,
  buttonSubmit,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={4}>
          <DatePicker
            label=""
            value={firstDate}
            views={["year", "month", "day"]}
            onChange={(newValue) => setFirstDate(newValue)}
          />
        </Grid>
        <Typography variant="body2" sx={{ ml: 1, mr: 1 }}>
          {" "}
          ~{" "}
        </Typography>
        <Grid item xs={4}>
          <DatePicker
            label=""
            value={secondaryDate}
            views={["year", "month", "day"]}
            onChange={(newValue) => setSecondaryDate(newValue)}
          />
        </Grid>
        <Grid item xs={2} sx={{ ml: 1 }}>
          <Button
            size="medium"
            variant="outlined"
            sx={{
              width: "80px",
              borderColor: "ButtonHighlight",
              backgroundColor: "ButtonFace",
              color: "ButtonText",
            }}
            onClick={buttonSubmit}
          >
            검색
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};
