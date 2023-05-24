import dayjs from "dayjs";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { SearchDate } from "../../common/mypage/pointHistory/searchDate";
import { HistoryList } from "./historyList";
import { useState, useEffect } from "react";
import { estimateHistoryForUser, estimateHistoryForRepair } from "../data/test";
import { Box, Container } from "@mui/material";
import { SelectFilter } from "../reservation/filter";
import { get } from "../../../api";
export const EstimateHistory = () => {
  //select filter
  const [selectValue, setSelectValue] = useState("전체");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const itemList = ["전체", "예약 대기", "예약 완료", "정비 완료"];
  // console.log(
  //   selectValue
  // );
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
  const [data, setData] = useState();
  //console.log(data);
  //user & data end

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user !== null) {
      if (user.roleType === "MEMBER") {
        get("http://localhost:8080/api/repair/estimate/history")
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            // 에러 처리
          });
      } else {
        get("http://localhost:8080/api/repair/estimate/history/mechanic")
          .then((res) => {
            setData(res.data);
          })
          .catch((error) => {
            // 에러 처리
          });
        // get("http://localhost:8080/api/repair/reservation/history/mechanic")
        //   .then((res) => {
        //     setData(res.data);
        //     setFilteredData(res.data);
        //   })
        //   .catch((error) => {
        //     // 에러 처리
        //   });
      }
    }
  }, []);

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
            itemList={data}
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
