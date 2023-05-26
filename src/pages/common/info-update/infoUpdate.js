import { useEffect, useState } from "react";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { UpdateFormUser } from "./updateFormUser";
import { UpdateFormMechanic } from "./updateFormMechanic";
import { UpdateFormSeller } from "./updateFormSeller";
import { Box } from "@mui/material";

export const InfoUpdate = () => {
  const [userState, setUserState] = useState({
    userName: "",
    userId: 0,
    roleType: "",
  });

  const { userName, userId, roleType } = userState;

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("user")) !== null) {
      //서버 호출 - 주는데이터 jwt, 받는데이터(point, account, isSubscription)

      setUserState({
        ...userState,
        userName: JSON.parse(window.localStorage.getItem("user")).name,
        userId: JSON.parse(window.localStorage.getItem("user")).memberId,
        roleType: JSON.parse(window.localStorage.getItem("user")).roleType,
      });
    }
  }, []);

  return (
    <>
      <TitleButtonBar title={"개인정보 수정"} />
      <Box sx={{ mb: 3 }}>
        {roleType === "MEMBER" ? (
          <UpdateFormUser />
        ) : roleType === "MECHANIC" ? (
          <UpdateFormMechanic />
        ) : roleType === "SELLER" ? (
          <UpdateFormSeller />
        ) : null}
      </Box>
    </>
  );
};
