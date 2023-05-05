import { FloatingWriteButton } from "./FloatingWriteButton";
import { ServiceListItem } from "./serviceListItem";
import { ServiceListPanelHeader } from "./serviceListPanelHeader";
import { Container, Grid } from "@mui/material";

export const ServiceListPanelMain = () => {
  const serviceList = [
    {
      img: "/phone.png",
      id: 1,
      serviceName: "애플 스마트폰 배터리 교체",
    },
    {
      img: "/phone.png",
      id: 2,
      serviceName: "윈도우 소프트웨어 오류 점검, 설치",
    },
    {
      img: "/phone.png",
      id: 3,
      serviceName: "노트북 점검",
    },
    {
      img: "/phone.png",
      id: 4,
      serviceName: "스마트폰 점검",
    },
    {
      img: "/phone.png",
      id: 5,
      serviceName: "PC 점검",
    },
  ];

  return (
    <>
      <ServiceListPanelHeader />
      <FloatingWriteButton />
      <ServiceListItem serviceList={serviceList}></ServiceListItem>
    </>
  );
};
