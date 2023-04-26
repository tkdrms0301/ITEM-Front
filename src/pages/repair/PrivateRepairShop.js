import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

export const PrivateRepairShop = () => {
  const { repairShopId } = useParams();

  useEffect(() => {
    console.log("PrivateRepairShop.js");
    console.log(repairShopId);
  }, []);

  return <>현재 정비소 ID : {repairShopId}</>;
};
