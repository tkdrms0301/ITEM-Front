import dayjs from "dayjs";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { SearchDate } from "../../common/mypage/pointHistory/searchDate";
import { HistoryList } from "./historyList";
import { useState } from "react";
import {
  users,
  estimateHistoryForUser,
  estimateHistoryForRepair,
} from "../data/test";
import { Container } from "@mui/material";

export const EstimateHistory = () => {
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2023-05-02"));
  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
  };

  const [currentUser, setCurrentUser] = useState(
    // users[0] // user
    users[1] // repair
  );
  const [data, setData] = useState(
    currentUser.role === "user"
      ? estimateHistoryForUser
      : estimateHistoryForRepair
  );
  console.log(currentUser);
  console.log(data);

  return (
    <>
      <TitleButtonBar title={"견적 내역"} />

      <Container sx={{ mt: "56px", p: 0, pt: "1%" }}>
        <SearchDate
          firstDate={firstDate}
          setFirstDate={setFirstDate}
          secondaryDate={secondaryDate}
          setSecondaryDate={setSecondaryDate}
          buttonSubmit={buttonSubmit}
        />

        <HistoryList itemList={data} role={currentUser.role} />
      </Container>
    </>
  );
};
