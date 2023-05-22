import { Header } from "./header";
import { Container } from "@mui/system";
import { AmountList } from "./amountList";
import { Card } from "@mui/material";
import { useEffect, useRef } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";

export const RechargeMain = () => {
  const amountList = [
    {
      amount: 10000,
      point: 9000,
      discountCouponMainOption: 10,
      discountCouponMainOptionCount: 1,
      discountCouponSubOption: 5,
      discountCouponSubOptionCount: 1,
    },
    {
      amount: 20000,
      point: 18000,
      discountCouponMainOption: 10,
      discountCouponMainOptionCount: 1,
      discountCouponSubOption: 5,
      discountCouponSubOptionCount: 3,
    },
    {
      amount: 30000,
      point: 27000,
      discountCouponMainOption: 10,
      discountCouponMainOptionCount: 1,
      discountCouponSubOption: 5,
      discountCouponSubOptionCount: 6,
    },
    {
      amount: 50000,
      point: 45000,
      discountCouponMainOption: 10,
      discountCouponMainOptionCount: 2,
      discountCouponSubOption: 5,
      discountCouponSubOptionCount: 10,
    },
    {
      amount: 100000,
      point: 90000,
      discountCouponMainOption: 20,
      discountCouponMainOptionCount: 5,
      discountCouponSubOption: 10,
      discountCouponSubOptionCount: 5,
    },
    {
      amount: 200000,
      point: 180000,
      discountCouponMainOption: 20,
      discountCouponMainOptionCount: 10,
      discountCouponSubOption: 10,
      discountCouponSubOptionCount: 12,
    },
  ];

  const paymentWidgetRef = useRef(null)
  const price = 50_00;
  const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
  const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      paymentWidget.renderPaymentMethods("#payment-widget", price);

      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);

  return (
    <>
      <Header />
      <Container sx={{ mt: 2 }}>
        <AmountList amountList={amountList} />
        <Card sx={{ mt: 2 }}>
          <div id="payment-widget" />
        </Card>
      </Container>
    </>
  );
};
