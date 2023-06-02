import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Header } from "./header";
import { SearchDate } from "./searchDate";
import { HistoryList } from "./historyList";
import { get } from "../../../../api";
import PointOrderTimeline from "./pointOrderTimeline";
import { Container } from "@mui/system";
import { Card } from "@mui/material";

export const PointHistory = () => {
  const currentDate = dayjs().startOf("month").format("YYYY-MM-DD");
  const [firstDate, setFirstDate] = useState(dayjs(currentDate));
  const [secondaryDate, setSecondaryDate] = useState(dayjs());
  const [itemList, setItemList] = useState([]);

  const buttonSubmit = () => {
    get("https//itemserverapi.azurewebsites.net/api/point/history/date", {
      params: {
        startDate: dayjs(firstDate).format("YYYY-MM-DDTHH:mm:ss"),
        endDate: dayjs(secondaryDate).format("YYYY-MM-DDTHH:mm:ss"),
      },
    })
      .then((response) => {
        setItemList(response.data.data);
        console.log(itemList[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("user")) !== null) {
      get("https//itemserverapi.azurewebsites.net/api/point/history")
        .then((response) => {
          setItemList(response.data.data);
          console.log(itemList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Header />

      <Container width="100%" sx={{ mt: 2 }}>
        <Card sx={{ boxShadow: 10, p: 1, py: 2 }}>
          <SearchDate
            firstDate={firstDate}
            setFirstDate={setFirstDate}
            secondaryDate={secondaryDate}
            setSecondaryDate={setSecondaryDate}
            buttonSubmit={buttonSubmit}
          />

          <PointOrderTimeline
            title={
              itemList[0] === undefined ? "포인트 이용내역이 없습니다." : ""
            }
            sx={{ mt: 2 }}
            list={itemList.map((data, index) => ({
              id: data.id,
              title: data.serviceName,
              point: data.point.toLocaleString(),
              type: `order${index + 1}`,
              time: data.date,
            }))}
          />
        </Card>
      </Container>
    </>
  );
};
