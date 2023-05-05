import { IncomeHeader } from "./incomeHeader";
import { useState } from "react";
import dayjs from "dayjs";
import { SearchDate } from "./searchDate";
import { Container } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import { IncomeTotal } from "./incomeTotal";
import HandymanIcon from "@mui/icons-material/Handyman";

export const IncomeMain = () => {
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2023-05-02"));
  const [serviceName, setServiceName] = useState(["전체 서비스"]);
  const [point, setPoint] = useState(15000);

  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
    console.log(serviceName);
  };

  const serviceList = [
    "전체 서비스",
    "액정 수리",
    "배터리 교체",
    "침수 세척",
    "전체 점검",
    "전면 카메라 수리",
    "후면 카메라 수리",
    "지문 인식 수리",
    "부품 교환",
  ];

  const IncomeServiceList = [
    { title: "액정 수리", date: "2021-05-02", point: 10000 },
    { title: "액정 수리", date: "2021-05-02", point: 10000 },
    { title: "배터리 교체", date: "2021-05-04", point: 30000 },
    { title: "배터리 교체", date: "2021-05-04", point: 30000 },
    { title: "전면 카메라 수리", date: "2021-05-05", point: 50000 },
    { title: "전면 카메라 수리", date: "2021-05-05", point: 50000 },
    { title: "전면 카메라 수리", date: "2021-05-06", point: 50000 },
    { title: "전면 카메라 수리", date: "2021-05-06", point: 50000 },
    { title: "전면 카메라 수리", date: "2021-05-06", point: 50000 },
    { title: "전면 카메라 수리", date: "2021-05-06", point: 50000 },
  ];

  return (
    <>
      <IncomeHeader></IncomeHeader>
      <SearchDate
        firstDate={firstDate}
        secondaryDate={secondaryDate}
        setFirstDate={setFirstDate}
        setSecondaryDate={setSecondaryDate}
        buttonSubmit={buttonSubmit}
        serviceList={serviceList}
        serviceName={serviceName}
        setServiceName={setServiceName}
      ></SearchDate>
      <IncomeTotal
        point={point}
        firstDate={firstDate}
        secondaryDate={secondaryDate}
      ></IncomeTotal>

      <Container>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            pt: 2,
            pb: 1,
            mb: 5,
            border: "2px solid gray",
          }}
        >
          {IncomeServiceList.map((data, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <HandymanIcon sx={{ fontSize: "30px" }} />
                </Grid>
                <Grid
                  item
                  xs={9}
                  sx={{
                    borderBottom: "1px solid gray",
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={9}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "gray",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {data.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "gray",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        {data.date}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {data.point} P
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
