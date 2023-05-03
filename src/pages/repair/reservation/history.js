import dayjs from "dayjs";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { SearchDate } from "../../common/mypage/pointHistory/searchDate";
import { HistoryList } from "./historyList";
import { useState } from "react";
import { reservationHistoryForUser } from "../data/test";
import { Container } from "@mui/material";

export const ReservationHistory = () => {
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2023-05-02"));
  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
  };
  console.log(reservationHistoryForUser);
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

        <HistoryList itemList={reservationHistoryForUser} />
      </Container>
    </>
  );
};
