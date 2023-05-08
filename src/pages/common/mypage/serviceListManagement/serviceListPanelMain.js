import { FloatingWriteButton } from "./FloatingWriteButton";
import { ServiceListItem } from "./serviceListItem";
import { ServiceListPanelHeader } from "./serviceListPanelHeader";
import { Container, Grid } from "@mui/material";

export const ServiceListPanelMain = () => {
  const serviceList = [
    {
      id: 1,
      serviceName: "애플 스마트폰 배터리 교체",
    },
    {
      id: 2,
      serviceName: "윈도우 소프트웨어 오류 점검, 설치",
    },
    {
      id: 3,
      serviceName: "노트북 점검",
    },
    {
      id: 4,
      serviceName: "스마트폰 점검",
    },
    {
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
