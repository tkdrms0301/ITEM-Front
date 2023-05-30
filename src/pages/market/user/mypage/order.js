import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Header } from "../component/header";
import { useEffect, useState } from "react";
import { AddressSearch } from "./order/addressSearch";
import { orderData } from "../testdata";
import { CustomCard } from "./order/customCard";
import { useNavigate } from "react-router-dom";

export const OrderPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const setAddress = (address) => {
    setData({ ...data, address: address });
  };

  useEffect(() => {
    setData(orderData);
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handlePayButtonClick = () => {
    alert("결제가 완료되었습니다.");
    navigate("/market/mypage/history");
  };

  if (data === null) return <></>;
  else
    return (
      <>
        <AddressSearch
          dialogStatus={open}
          setStatus={setOpen}
          setAddress={setAddress}
        />
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          <Header />
        </Box>
        <Container sx={{ mt: 8, mb: 2 }}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            rowSpacing={2}
            sx={{ mt: 8 }}
          >
            <Grid item xs={12} sx={{ width: "90%" }}>
              <CustomCard
                title={"수신자 정보"}
                content={
                  <Typography variant={"body1"}>
                    {data.name}
                    <br />
                    {data.phone}
                  </Typography>
                }
                action={null}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "90%" }}>
              <CustomCard
                title={"배송지"}
                content={
                  <Typography variant={"body1"}>
                    {data.address === null
                      ? "배송지를 입력해주세요."
                      : data.address}
                  </Typography>
                }
                action={handleOpen}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "90%" }}>
              <CustomCard
                title={"상품정보"}
                content={
                  <Box sx={{ mt: -3, ml: -3 }}>
                    {data.orderItems.map((item, index) => {
                      return (
                        <Grid
                          container
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          sx={{
                            mt: 1,
                            borderBottom:
                              index === data.orderItems.length - 1
                                ? null
                                : "1px solid #e0e0e0",
                          }}
                          key={index}
                        >
                          <Grid item xs={4}>
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{ width: "100%" }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={8}
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <Typography variant={"body1"}>
                              {item.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}></Grid>
                          <Grid item xs={4}>
                            <Typography variant={"h6"} textAlign={"center"}>
                              수량 : {item.quantity}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant={"h5"}>
                              {item.price * item.quantity}Point
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Box>
                }
                action={null}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "90%" }}>
              <CustomCard
                title={"포인트 결제"}
                content={
                  <Grid container justifyContent={"flex-end"} sx={{ pr: 2 }}>
                    <Typography
                      variant={"h6"}
                      sx={{
                        color:
                          data.balance < data.totalPrice ? "orangered" : "blue",
                      }}
                    >
                      잔액 : {data.balance} ITEM 포인트
                    </Typography>
                    <Typography variant={"h6"}>
                      최종 결제 포인트 : {data.totalPrice} ITEM 포인트
                    </Typography>
                    {data.balance < data.totalPrice ? (
                      <Box
                        onClick={() => {
                          window.confirm(
                            "포인트가 부족합니다. 충전하시겠습니까? \n진행중이던 주문은 취소됩니다."
                          ) &&
                            window.location.replace(
                              "/mypage/point/rechargeMain"
                            );
                        }}
                      >
                        <Button variant={"contained"} sx={{ ml: 2 }} disabled>
                          결제하기
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant={"contained"}
                        sx={{ ml: 2 }}
                        onClick={handlePayButtonClick}
                      >
                        결제하기
                      </Button>
                    )}
                  </Grid>
                }
                action={null}
              />
            </Grid>
          </Grid>
        </Container>
      </>
    );
};
