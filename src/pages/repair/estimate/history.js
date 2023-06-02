import dayjs from "dayjs";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { SearchDate } from "../../common/mypage/pointHistory/searchDate";
import { HistoryList } from "./historyList";
import { useState, useEffect } from "react";
import { estimateHistoryForUser, estimateHistoryForRepair } from "../data/test";
import { Box, Container } from "@mui/material";
import { SelectFilter } from "../reservation/filter";
import { get } from "../../../api";
import { Header } from "./header";
export const EstimateHistory = () => {
  //select filter
  const [selectValue, setSelectValue] = useState("전체");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const itemList = ["전체", "응답 대기", "응답 완료"];
  // console.log(
  //   selectValue
  // );
  //select filter end

  //search date
  const [firstDate, setFirstDate] = useState(dayjs("1900-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2099-12-31"));

  const [filteredData, setFilteredData] = useState();

  const buttonSubmit = () => {
    const filteredDataByDate = data.filter((item) => {
      const itemDate = dayjs(item.date, "YYYY-MM-DD");
      const itemTime = dayjs(item.date, "HH:mm");
      const firstDateTime = dayjs(firstDate).startOf("day");
      const secondaryDateTime = dayjs(secondaryDate).endOf("day");

      return (
        itemDate.isSame(firstDateTime, "day") ||
        itemDate.isSame(secondaryDateTime, "day") ||
        (itemDate.isAfter(firstDateTime, "day") &&
          itemDate.isBefore(secondaryDateTime, "day")) ||
        itemTime.isSame(firstDateTime, "minute") ||
        itemTime.isSame(secondaryDateTime, "minute") ||
        (itemTime.isAfter(firstDateTime, "minute") &&
          itemTime.isBefore(secondaryDateTime, "minute"))
      );
    });

    setFilteredData(filteredDataByDate);
  };
  //search date end

  //user & data
  const [data, setData] = useState();
  //console.log(data);
  //user & data end

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user !== null) {
      if (user.roleType === "MEMBER") {
        get("https://itemserverapi.azurewebsites.net/api/repair/estimate/history")
          .then((res) => {
            setData(res.data);
            setFilteredData(res.data);
          })
          .catch((error) => {
            // 에러 처리
          });
      } else {
        get("https://itemserverapi.azurewebsites.net/api/repair/estimate/history/mechanic")
          .then((res) => {
            setData(res.data);
            setFilteredData(res.data);
          })
          .catch((error) => {
            // 에러 처리
          });
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ mt: 2, p: 0, pt: "1%" }}>
        <SearchDate
          firstDate={firstDate}
          setFirstDate={setFirstDate}
          secondaryDate={secondaryDate}
          setSecondaryDate={setSecondaryDate}
          buttonSubmit={buttonSubmit}
        />
        <Box
          sx={{
            padding: "0 1rem",
            mt: "1rem",
          }}
        >
          <SelectFilter
            selectValue={selectValue}
            handleChange={handleChange}
            itemList={itemList}
          />
        </Box>

        {data ? (
          <HistoryList
            itemList={
              selectValue === "전체"
                ? filteredData
                : filteredData.filter((item) => item.status === selectValue)
            }
            role={
              JSON.parse(window.localStorage.getItem("user")).roleType ===
              "MEMBER"
                ? "user"
                : "repair"
            }
          />
        ) : null}
      </Container>
    </>
  );
};
