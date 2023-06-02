import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Header } from "../component/header";
import { useEffect, useState } from "react";
import { AddressSearch } from "./order/addressSearch";
import { CustomCard } from "./order/customCard";
import { useNavigate } from "react-router-dom";
import palette from "../../../../theme/palette";
import { fCurrency } from "../../../data/utils/formatNumber";

const cartData = [
  {
    id: 1,
    name: "포유컴퓨터 퍼포먼스PC 32 i5 13400F RTX3060Ti",
    price: 1067190,
    quantity: 2,
    selected: true,
    imageUrl:
      "https://img.danawa.com/prod_img/500000/671/806/img/19806671_1.jpg?shrink=130:130&_v=20230517163933",
  },
  {
    id: 2,
    name: "영웅컴퓨터 영웅 875 게이밍울트라560X ",
    price: 829830,
    quantity: 1,
    selected: false,
    imageUrl:
      "https://img.danawa.com/prod_img/500000/484/546/img/13546484_1.jpg?shrink=130:130&_v=20230424160107",
  },
  {
    id: 3,
    name: "한성컴퓨터 TFG AX3i607iX (16GB, M.2 500GB)",
    price: 2198980,
    quantity: 3,
    selected: true,
    imageUrl:
      "https://img.danawa.com/prod_img/500000/785/864/img/18864785_1.jpg?shrink=330:*&_v=20230130103201",
  },
];
const orderData = {
  name: "홍길동",
  phone: "010-1234-5678",
  address: "서울시 강남구 테헤란로 427 위워크타워 10층",
  orderItems: cartData.filter((item) => item.selected),
  totalPrice: cartData.reduce(
    (total, item) =>
      item.selected ? total + item.price * item.quantity : total,
    0
  ),
  balance: 100000,
};

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
        <Header title={"주문 확인"} />
        <Container sx={{ my: 2 }} width={"100%"}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            rowSpacing={2}
          >
            <Grid item xs={12} sx={{ width: "100%" }}>
              <CustomCard
                title={"수신자 정보"}
                content={
                  <Typography variant={"subtitle2"} sx={{ py: 1, px: 2 }}>
                    이름 : {data.name}
                    <br />
                    전화번호 : {data.phone}
                  </Typography>
                }
                action={null}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <CustomCard
                title={"배송지"}
                content={
                  <Typography variant={"subtitle2"} sx={{ py: 1, px: 2 }}>
                    {data.address === null
                      ? "배송지를 입력해주세요."
                      : data.address}
                  </Typography>
                }
                action={handleOpen}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <CustomCard
                title={"상품정보"}
                content={
                  <Box>
                    {data.orderItems.map((item, index) => {
                      return (
                        <Box key={index}>
                          <Grid
                            container
                            alignItems={"center"}
                            sx={{
                              py: 3,
                              borderBottom:
                                index === data.orderItems.length - 1
                                  ? null
                                  : `1px solid ${palette.grey[400]}}`,
                            }}
                            key={index}
                          >
                            <Grid item xs={4} sx={{ px: 2 }}>
                              <Box
                                component={"img"}
                                src={item.imageUrl}
                                alt={item.name}
                                sx={{ width: "100%", height: "auto" }}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <Typography
                                noWrap
                                sx={{ overflow: "hidden" }}
                                variant={"subtitle1"}
                              >
                                {item.name}
                              </Typography>
                              <Typography variant={"subtitle2"} sx={{ mt: 1 }}>
                                수량 : {item.quantity}
                              </Typography>

                              <Typography variant={"subtitle2"}>
                                가격 :{" "}
                                {fCurrency(item.price * item.quantity) + " P"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    })}
                  </Box>
                }
                action={null}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "100%" }}>
              <CustomCard
                title={"포인트 결제"}
                content={
                  <Grid container sx={{ px: 2, my: 2 }}>
                    <Grid item xs={12}>
                      <Typography variant={"h6"}>
                        결제 포인트 : {fCurrency(data.totalPrice) + " P"}
                      </Typography>
                      <Grid
                        item
                        xs={12}
                        sx={{ py: 1, display: "flex", flexDirection: "column" }}
                      >
                        <Typography
                          variant={"subtitle1"}
                          sx={{
                            color:
                              data.balance < data.totalPrice
                                ? "orangered"
                                : "blue",
                          }}
                        >
                          보유 포인트 : {fCurrency(data.balance) + " P"}
                        </Typography>
                        {data.balance < data.totalPrice ? (
                          <Typography
                            variant="body2"
                            sx={{ color: "orangered" }}
                          >
                            (포인트가 부족합니다.)
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>

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
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button color="inherit" variant={"contained"} disabled>
                          결제하기
                        </Button>
                      </Box>
                    ) : (
                      <Button
                        variant={"contained"}
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
