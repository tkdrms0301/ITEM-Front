import {
  Container,
  Grid,
  Button,
  Typography,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";

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
  serviceName,
  setServiceName,
  serviceList,
}) => {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("전체 서비스")) setServiceName(["전체 서비스"]);
    else setServiceName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Container sx={{ pb: 2, borderBottom: "2px solid gray" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                mt: 2,
              }}
            >
              <Grid item xs={9}>
                <Grid
                  container
                  sx={{
                    m: 0,
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid item xs={5.5}>
                    <DatePicker
                      fullWidth
                      slotProps={{ textField: { size: "small" } }}
                      label="처음날짜"
                      value={firstDate}
                      views={["year", "month", "day"]}
                      onChange={(newValue) => setFirstDate(newValue)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ ml: 1, mr: 1 }}> ~ </Typography>
                  </Grid>
                  <Grid item xs={5.5}>
                    <DatePicker
                      fullWidth
                      label="마지막날짜"
                      slotProps={{ textField: { size: "small" } }}
                      value={secondaryDate}
                      views={["year", "month", "day"]}
                      onChange={(newValue) => setSecondaryDate(newValue)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl sx={{ mt: 2 }} fullWidth size="small">
                      <InputLabel>서비스명</InputLabel>
                      <Select
                        multiple
                        value={serviceName}
                        onChange={handleChange}
                        sx={{ fontWeight: "bold" }}
                        input={<OutlinedInput label="서비스명" />}
                      >
                        {serviceList.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            sx={{ fontWeight: "bold" }}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={buttonSubmit}
                  sx={{ ml: 1 }}
                >
                  검색
                </Button>
              </Grid>

            </Grid>
          </DemoContainer>
        </LocalizationProvider>
      </Container>
    </>
  );
};
