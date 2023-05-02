import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

import { BackButton } from "../../community/component/backButton";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

export const PointHistory = () => {
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2023-05-02"));

  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
  };

  const itemList = [
    {
      img: "/phone.png",
      id: 1,
      title: "리뷰 추천 누적 10회",
      model: "아이폰12",
      point: 500,
    },
    {
      img: "/phone.png",
      id: 2,
      title: "상품 구매",
      model: "아이폰12",
      point: -100000000,
    },
  ];

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          borderBottom: "2px solid gray",
        }}
      >
        <Box sx={{ height: "56px", display: "flex", alignItems: "center" }}>
          <BackButton />
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 3 }}>
            포인트 이용내역
          </Typography>
        </Box>
      </Container>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
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
              <Typography sx={{ ml: 1, mr: 1 }}> ~ </Typography>
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
                  variant="contained"
                  sx={{ width: "80px" }}
                  onClick={buttonSubmit}
                >
                  검색
                </Button>
              </Grid>
            </Grid>
          </DemoContainer>
        </LocalizationProvider>
      </Container>
      <Container>
        {itemList.map((data, index) => (
          <Grid
            container
            key={data.id}
            sx={{ mt: 2, backgroundColor: "#F9F9F9" }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={data.img} width={"50%"} height={"80%"}></img>
            </Grid>
            <Grid item xs={7}>
              <Grid container sx={{ ml: 1, p: 1 }}>
                <Grid item xs={12}>
                  <Typography
                    variant="h7"
                    sx={{ fontWeight: "bold", color: "#9A9A9A" }}
                  >
                    {data.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#747373",
                    }}
                  >
                    {data.model}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                    {data.point.toLocaleString()} ITEM 포인트
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              d
            </Grid>
          </Grid>
        ))}
      </Container>
    </>
  );
};
