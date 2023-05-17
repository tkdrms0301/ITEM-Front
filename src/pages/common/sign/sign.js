import { Grid } from "@mui/material";
import { useState } from "react";
import { Header } from "./header";
import { RoleList } from "./roleList";
import { UserForm } from "./userForm";
import { RepairForm } from "./repairForm";
import { SellerForm } from "./sellerForm";

export const Sign = () => {
  const [roleType, setRoleType] = useState("MEMBER");

  return (
    <Grid container spacing={1} sx={{ mb: 3 }}>
      <Header />
      <RoleList setRoleType={setRoleType} roleType={roleType} />
      {roleType === "MEMBER" ? (
        <UserForm roleType={roleType} />
      ) : roleType === "SELLER" ? (
        <SellerForm roleType={roleType} />
      ) : roleType === "MECHANIC" ? (
        <RepairForm roleType={roleType} />
      ) : null}
    </Grid>
  );
};
