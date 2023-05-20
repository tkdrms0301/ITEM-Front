import { useEffect, useState } from "react";
import { get } from "../../../../api";
import { FloatingWriteButton } from "./FloatingWriteButton";
import { ServiceListItem } from "./serviceListItem";
import { ServiceListPanelHeader } from "./serviceListPanelHeader";
import { Container, Grid } from "@mui/material";

export const ServiceListPanelMain = () => {
const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    get("http://localhost:8080/api/repair/serviceList", {})
      .then((response) => {
        console.log(response);
        setServiceList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ServiceListPanelHeader />
      <FloatingWriteButton />
      <ServiceListItem serviceList={serviceList}></ServiceListItem>
    </>
  );
};
