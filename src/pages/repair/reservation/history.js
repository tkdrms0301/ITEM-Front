import dayjs from "dayjs";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { SearchDate } from "../../common/mypage/pointHistory/searchDate";
import { HistoryList } from "./historyList";
import { useEffect, useState } from "react";
import { reservationHistoryForUser } from "../data/test";
import { Box, Container } from "@mui/material";
import { SelectFilter } from "./filter";
import { get } from "../../../api";

export const ReservationHistory = () => {
  //select filter
  const [selectValue, setSelectValue] = useState("전체");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const itemList = ["전체", "예약 대기", "예약 완료", "정비 완료"];
  //select filter end

  //search date
  const [firstDate, setFirstDate] = useState(dayjs("1900-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2099-12-31"));

  const [filteredData, setFilteredData] = useState();

  const buttonSubmit = () => {
    const filteredDataByDate = data.filter((item) => {
      const itemDate = dayjs(item.date, "YYYY-MM-DD");
      const itemTime = dayjs(item.time, "HH:mm");
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
  //   JSON.parse(window.localStorage.getItem("user")) !== null
  //     ? JSON.parse(window.localStorage.getItem("user")).roleType === "MEMBER"
  //       ? reservationHistoryForUser
  //       : reservationHistoryForUser //정비사의 경우 데이터 받을 것. 내가 보기엔 정비사와 사용자의
  //     : //데이터 간 차이가 없어서 reservationHistoryForRepair를 일단 지운 것
  //       undefined
  // );
  //user & data end

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user !== null) {
      if (user.roleType === "MEMBER") {
        get("http://localhost:8080/api/repair/reservation/history")
          .then((res) => {
            setData(res.data);
            setFilteredData(res.data);
          })
          .catch((error) => {
            // 에러 처리
          });
      } else {
        get("http://localhost:8080/api/repair/reservation/history/mechanic")
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
      <TitleButtonBar title={"예약 내역"} />

      <Container sx={{ mt: "56px", p: 0, pt: "1%" }}>
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

        <HistoryList
          itemList={
            selectValue === "전체"
              ? filteredData
              : filteredData.filter((item) => item.status === selectValue)
          }
          role={
            JSON.parse(window.localStorage.getItem("user")) !== null
              ? JSON.parse(window.localStorage.getItem("user")).roleType ===
                "MEMBER"
                ? "user"
                : "repair"
              : null
          }
        />
      </Container>
    </>
  );
};
