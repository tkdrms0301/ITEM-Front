import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { SearchDate } from "../../../common/mypage/pointHistory/searchDate";
import { SelectFilter } from "../../../repair/reservation/filter";
import { Header } from "../component/header";
import { orderHistoryData } from "../testdata";
import { CustomCard } from "./order/customCard";
import { useNavigate } from "react-router-dom";

export const OrderHistoryPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    setData(orderHistoryData);
  }, []);

  //select filter
  const [selectValue, setSelectValue] = useState("전체");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  const itemList = ["전체", "결제 완료", "배송중", "배송 완료", "구매 확정"];
  //select filter end

  //search date
  const [firstDate, setFirstDate] = useState(dayjs("2021-01-01"));
  const [secondaryDate, setSecondaryDate] = useState(
    dayjs(dayjs().format("YYYY-MM-DD"))
  );

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

  const HistoryList = () => {
    const navigate = useNavigate();
    if (data === undefined) return <></>;
    return (
      <>
        {data.map((item) => {
          return (
            <Box
              key={item.id}
              onClick={() => {
                navigate("/market/mypage/history/detail", {
                  state: { item: item },
                });
              }}
              sx={{
                mt: 1,
              }}>
              <CustomCard
                title={
                  item.orderData.orderItems[0].name +
                  " 외 " +
                  item.orderData.orderItems.length +
                  "개"
                }
                content={
                  <Grid container sx={{}}>
                    <Grid item xs={4}>
                      <img
                        src={item.orderData.orderItems[0].imageUrl}
                        alt={item.orderData.orderItems[0].name}
                        style={{ width: "70%" }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Grid
                        container
                        alignItems="center"
                        sx={{ height: "100%" }}>
                        <Grid item xs={12}>
                          <Typography variant="body1">{item.status}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            {item.orderData.totalPrice} ITEM 포인트
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                }
                action={() => {}}
              />
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          backgroundColor: "white",
        }}>
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
          }}>
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
