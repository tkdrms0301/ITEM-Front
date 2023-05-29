import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import dayjs from "dayjs";
import { SearchDate } from "../../../common/mypage/pointHistory/searchDate";
import { SelectFilter } from "../../../repair/reservation/filter";
import { Header } from "../component/header";

export const OrderHistoryPage = () => {
  const [data, setData] = useState();

  useEffect(() => {}, []);

  //select filter
  const [selectValue, setSelectValue] = useState("전체");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const itemList = ["전체", "주문 완료", "배송 출발", "배송 완료", "구매 확정"];
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

    console.log(data);
    console.log(filteredDataByDate);
    setFilteredData(filteredDataByDate);
  };
  //search date end

  const HistoryList = () => {
    return (
      <div>
        <h1>HistoryList</h1>
      </div>
    );
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
        }}
      >
        <Header title={"주문목록"} />
      </Box>
      <Container sx={{ mt: "56px", p: 1, pt: 3 }}>
        <SearchDate
          firstDate={firstDate}
          setFirstDate={setFirstDate}
          secondaryDate={secondaryDate}
          setSecondaryDate={setSecondaryDate}
          buttonSubmit={buttonSubmit}
        />
        <Box
          sx={{
            // padding: "0 1rem",
            mt: "1rem",
          }}
        >
          <SelectFilter
            selectValue={selectValue}
            handleChange={handleChange}
            itemList={itemList}
          />
        </Box>

        <HistoryList />
      </Container>
    </>
  );
};
