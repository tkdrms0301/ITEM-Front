import { IncomeHeader } from "./incomeHeader";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { SearchDate } from "./searchDate";
import { Container } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import { IncomeTotal } from "./incomeTotal";
import HandymanIcon from "@mui/icons-material/Handyman";
import { BaseUrl } from "../../../../api/BaseUrl";
import { get, post } from "../../../../api";

export const IncomeMain = () => {
  const currentDate = dayjs().startOf("month").format("YYYY-MM-DD");
  const [firstDate, setFirstDate] = useState(dayjs(currentDate));
  const [secondaryDate, setSecondaryDate] = useState(dayjs());
  const [serviceName, setServiceName] = useState([]);
  const [point, setPoint] = useState(0);
  const [serviceList, setServiceList] = useState([]);
  const [incomeServiceList, setIncomeServiceList] = useState([]);

  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
    console.log(serviceName);

    post(BaseUrl + "/api/point/income-history/dateAndServiceName", {
      startDate: dayjs(firstDate).toDate(),
      endDate: dayjs(secondaryDate).toDate(),
      serviceName: serviceName,
    })
      .then((response) => {
        console.log(response);
        setIncomeServiceList(response.data.data);

        setPoint(0);
        response.data.data.map((data) => {
          setPoint((prev) => prev + data.point);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    get(BaseUrl + "/api/repair/serviceList")
      .then((response) => {
        console.log(response);
        setServiceList(response.data);
        setServiceName(response.data.map((data) => data.serviceName));
      })
      .catch((error) => {
        console.log(error);
      });

    get(BaseUrl + "/api/point/income-history")
      .then((response) => {
        console.log(response);
        setIncomeServiceList(response.data.data);

        response.data.data.map((data) => {
          setPoint((prev) => prev + data.point);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {incomeServiceList.map((data, index) => (
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
                        {data.serviceName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "gray",
                          fontWeight: "bold",
                          fontSize: "13px",
                        }}
                      >
                        {dayjs(data.date).format("YYYY-MM-DD / HH:mm")}
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
