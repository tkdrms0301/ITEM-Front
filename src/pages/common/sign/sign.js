import { Grid } from "@mui/material";
import { useState } from "react";
import { Header } from "./header";
import { RoleList } from "./roleList";
import { UserForm } from "./userForm";
import { RepairForm } from "./repairForm";
import { SellerForm } from "./sellerForm";

export const Sign = () => {
  const [roleType, setRoleType] = useState("일반사용자");

  return (
    <Grid container spacing={1} sx={{ mb: 3 }}>
      <Header />
      <RoleList setRoleType={setRoleType} roleType={roleType} />
      {roleType == "일반사용자" ? (
        <UserForm roleType={roleType} />
      ) : roleType == "판매자" ? (
        <SellerForm roleType={roleType} />
      ) : roleType == "정비사" ? (
        <RepairForm roleType={roleType} />
      ) : null}
    </Grid>
  );
};
