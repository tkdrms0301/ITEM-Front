import {
  Container,
  Grid,
  Typography,
  Box,
  Link,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Header } from "./header";
import { RoleList } from "./roleList";
import { UserForm } from "./userForm";

export const Sign = () => {
  const [roleType, setRoleType] = useState("일반사용자");

  return (
    <Grid container spacing={1}>
      <Header />
      <RoleList setRoleType={setRoleType} roleType={roleType} />
      {roleType == "일반사용자" ? <UserForm roleType={roleType} /> : null}
    </Grid>
  );
};
