import { Box, Grid, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../component/header";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RedeemIcon from "@mui/icons-material/Redeem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Tracker } from "./order/tracker";

export const HistoryDetailPage = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setData(location.state.item);
  }, []);

  const [open, setOpen] = useState(false);

  if (data === null) return <></>;
  else
    return (
      <>
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            zIndex: 1000,
            backgroundColor: "white",
          }}>
          <Header title={"주문 내역"} />
        </Box>
        <Box sx={{ mt: 5, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <AssignmentIcon sx={{ mr: 1 }} />
            <Typography variant="h4">주문 정보</Typography>
          </Box>

          <Card sx={{ p: 2, boxShadow: 10 }}>
            <Typography variant="subtitle1" gutterBottom>
              주문 번호 : {data.id}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              주문 일자 : {data.date}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              수신자 : {data.orderData.name}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography noWrap variant="subtitle1" gutterBottom>
                  배송 주소 : &nbsp;
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  {data.orderData.address}
                </Typography>
              </Box>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              연락처 : {data.orderData.phone}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              주문 상태 : {data.status}
            </Typography>
            <Typography variant="subtitle1">
              총 결제 포인트 : {data.orderData.totalPrice} ITEM 포인트
            </Typography>
          </Card>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            <LocalShippingIcon sx={{ mr: 1 }} />
            <Typography variant="h4">배송 정보</Typography>
          </Box>
          <Card
            onClick={() => setOpen(!open)}
            sx={{ p: 2, pb: 0, boxShadow: 10 }}>
            <Typography variant="subtitle1" gutterBottom>
              주문 상태: {data.status}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              택배사 : {data.carrier.name}
            </Typography>
            <Typography variant="subtitle1">
              송장 번호: {data.trackingNumber}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
              }}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Box>
            {open && (
              <Box sx={{ mt: 0 }}>
                <Tracker carrier={data.carrier} trackId={data.trackingNumber} />
              </Box>
            )}
          </Card>

          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            <RedeemIcon sx={{ mr: 1 }} />
            <Typography variant="h4">주문 상품</Typography>
          </Box>
          <Card sx={{ p: 2, pt: 0, boxShadow: 10 }}>
            {data.orderData.orderItems.map((item, index) => (
              <Grid
                container
                spacing={2}
                key={index}
                sx={{
                  mt: 1,
                  borderBottom:
                    index === data.orderData.orderItems.length - 1
                      ? null
                      : "1px solid #e0e0e0",
                }}>
                <Grid item xs={4}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="subtitle1">
                    수량 : {item.quantity}
                  </Typography>
                  <Typography variant="subtitle1">
                    {item.price * item.quantity} ITEM 포인트
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Card>
        </Box>
      </>
    );
};
