import { useEffect, useState } from "react";
import { get } from "../../../../api";
import { FloatingWriteButton } from "./FloatingWriteButton";
import { ServiceListItem } from "./serviceListItem";
import { ServiceListPanelHeader } from "./serviceListPanelHeader";
import { Container, Grid } from "@mui/material";
import { BaseUrl } from "../../../../api/BaseUrl";

export const ServiceListPanelMain = () => {
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    get(BaseUrl + "/api/repair/serviceList", {})
      .then((response) => {
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
