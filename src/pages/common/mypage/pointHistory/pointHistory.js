import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Header } from "./header";
import { SearchDate } from "./searchDate";
import { HistoryList } from "./historyList";
import axios from "axios";

export const PointHistory = () => {
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2023-05-02"));
  const [itemList, setItemList] = useState([]);

  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
  };

  // const itemList = [
  //   {
  //     img: "/phone.png",
  //     id: 1,
  //     serviceName: "리뷰 추천 누적 10회",
  //     serviceType: "아이폰12",
  //     point: 500,
  //   },
  //   {
  //     img: "/phone.png",
  //     id: 2,
  //     serviceName: "상품 구매",
  //     serviceType: "아이폰12",
  //     point: -100000000,
  //   },
  // ];

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("user")) !== null) {
      //서버 호출 - 주는데이터 jwt, 받는데이터(point, account, isSubscription)

      let token = JSON.parse(window.localStorage.getItem("token")).accessToken;

      axios
        .get("http://localhost:8080/api/point/history", {
          params: {
            id: JSON.parse(window.localStorage.getItem("user")).memberId,
          },
          headers: { "X-AUTH-TOKEN": token },
        })
        .then((response) => {
          setItemList(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Header />
      <SearchDate
        firstDate={firstDate}
        setFirstDate={setFirstDate}
        secondaryDate={secondaryDate}
        setSecondaryDate={setSecondaryDate}
        buttonSubmit={buttonSubmit}
      />
      <HistoryList itemList={itemList} />
    </>
  );
};
