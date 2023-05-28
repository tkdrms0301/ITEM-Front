import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import { Header } from "./header";
import { Container } from "@mui/system";
import palette from "../../../theme/palette";
import { useNavigate } from "react-router";
import { PlanList } from "./planList";
import { post } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";
import { useEffect, useState } from "react";

export const SubscriptionMain = () => {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const trialStartButton = () => {
    // navigate("/sign");
    alert("이미 서비스를 받았습니다.");
  };

  const basicStartButton = () => {
    post(BaseUrl + "/api/member/subscribe")
      .then((res) => {
        if (res.data.success) {
          alert("구독 성공");
        } else {
          alert("포인트가 부족합니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("데이터 구독권 구매");
  };

  const planList = [
    {
      planTitle: "TRIAL",
      subTitle: "간편 회원가입하고 무료로 데이터를 분석해보세요!",
      planPrice: "무료",
      planDate: " 첫 1주일",
      planService1: "검색 제품 긍/부정도",
      planServiceDate1: "무제한",
      planService2: "연관어 언급량 검색",
      planServiceDate2: "무제한",
      planService3: "분석 기간",
      planServiceDate3: "1주일",
      onClick: trialStartButton,
    },

    {
      planTitle: "BASIC",
      subTitle: "최근 1년동안의 데이터를 분석할 수 있어요!",
      planPrice: "29,700원",
      planDate: " 30일(포인트 결제 가능)",
      planService1: "검색 제품 긍/부정도",
      planServiceDate1: "무제한",
      planService2: "연관어 언급량 검색",
      planServiceDate2: "무제한",
      planService3: "분석 기간",
      planServiceDate3: "30일",
      onClick: basicStartButton,
    },
  ];

  return (
    <>
      {windowWidth <= 1200 && <Header />}
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Typography variant="h4">연결제 플랜 이용 시</Typography>
          <Typography variant="h4" sx={{ color: palette.info.dark }}>
            모든 플랜 10% 할인 제공
          </Typography>
        </Box>

        {planList.map((planList, index) => (
          <PlanList key={index} planList={planList} />
        ))}
      </Container>
    </>
  );
};
