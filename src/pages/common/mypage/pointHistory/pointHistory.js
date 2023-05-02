import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Header } from "./header";
import { SeachDate } from "./seachDate";
import { HistoryList } from "./historyList";

export const PointHistory = () => {
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(dayjs("2023-05-02"));

  const buttonSubmit = () => {
    console.log(dayjs(firstDate).toDate());
    console.log(dayjs(secondaryDate).toDate());
  };

  const itemList = [
    {
      img: "/phone.png",
      id: 1,
      title: "리뷰 추천 누적 10회",
      model: "아이폰12",
      point: 500,
    },
    {
      img: "/phone.png",
      id: 2,
      title: "상품 구매",
      model: "아이폰12",
      point: -100000000,
    },
  ];

  return (
    <>
      <Header />
      <SeachDate
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
