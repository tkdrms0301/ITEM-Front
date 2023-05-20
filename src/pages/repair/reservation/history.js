import dayjs from "dayjs";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { SearchDate } from "../../common/mypage/pointHistory/searchDate";
import { HistoryList } from "./historyList";
import { useState } from "react";
import {
  reservationHistoryForUser,
  reservationHistoryForRepair,
} from "../data/test";
import { Box, Container } from "@mui/material";
import { SelectFilter } from "./filter";

export const ReservationHistory = () => {
  //select filter
  const [selectValue, setSelectValue] = useState("전체");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const itemList = ["전체", "예약 대기", "예약 완료", "정비 완료"];
  console.log(selectValue);
  //select filter end

  //search date
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2023-05-02"));
  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
  };
  //search date end

  //user & data
  const [data, setData] = useState(
    JSON.parse(window.localStorage.getItem("user")) !== null
      ? JSON.parse(window.localStorage.getItem("user")).roleType === "MEMBER"
        ? reservationHistoryForUser
        : reservationHistoryForRepair
      : undefined
  );
  console.log(data);
  //user & data end

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
          itemList={data}
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
