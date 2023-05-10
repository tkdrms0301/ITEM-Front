import {
  Container,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Box,
} from "@mui/material";
import { useRef } from "react";

export const UpdateFormMechanic = () => {
  const emailRef = useRef(null);
  const nickName = useRef(null);
  const address = useRef(null);
  const password = useRef(null);
  const newPassword = useRef(null);
  const passwordVali = useRef(null);
  const phoneNumber = useRef(null);
  const currentPassword = useRef(null);
  const shopName = useRef(null);
  const shopAddress = useRef(null);
  const shopPhoneNumber = useRef(null);
  const shopDescription = useRef(null);

  const validatecurrentPassword = (e) => {
    console.log(currentPassword.current.value);
  };
  const validateNickname = (e) => {
    console.log(nickName.current.value);
  };
  const validatePassword = (e) => {
    console.log(passwordVali.current.value);
  };

  const infoUpdateSubmit = () => {
    console.log(emailRef.current.value);
    console.log(address.current.value);
    console.log(nickName.current.value);
    console.log(password.current.value);
    console.log(newPassword.current.value);
    console.log(passwordVali.current.value);
    console.log(phoneNumber.current.value);
    console.log(shopName.current.value);
    console.log(shopAddress.current.value);
    console.log(shopPhoneNumber.current.value);
    console.log(shopDescription.current.value);
  };

  const boxList = [
    {
      name: "currentPassword",
      ref: currentPassword,
      id: "currentPassword",
      label: "현재 비밀번호 확인",
      type: "password",
      vali: validatecurrentPassword,
    },
    {
      name: "nickName",
      ref: nickName,
      id: "nickName",
      label: "닉네임(중복불가)",
      type: "nickName",
      vali: validateNickname,
    },
    {
      name: "address",
      ref: address,
      id: "address",
      label: "사용자 주소",
      type: "address",
    },
    {
      name: "newPassword",
      ref: newPassword,
      id: "newPassword",
      label: "새 비밀번호",
      type: "newPassword",
    },
    {
      name: "passwordVali",
      ref: passwordVali,
      id: "passwordVali",
      label: "비밀번호 확인",
      type: "passwordVali",
      vali: validatePassword,
    },
    {
      name: "phoneNumber",
      ref: phoneNumber,
      id: "phoneNumber",
      label: "개인 휴대전화(-제외)",
      type: "phoneNumber",
    },
    {
      name: "shopName",
      ref: shopName,
      id: "shopName",
      label: "가게명",
      type: "shopName",
    },
    {
      name: "shopAddress",
      ref: shopAddress,
      id: "shopAddress",
      label: "가게 주소",
      type: "shopAddress",
    },
    {
      name: "shopPhoneNumber",
      ref: shopPhoneNumber,
      id: "shopPhoneNumber",
      label: "가게 전화번호",
      type: "shopPhoneNumber",
    },
    {
      name: "shopDescription",
      ref: shopDescription,
      id: "shopDescription",
      label: "가게 설명",
      type: "shopDescription",
    },
  ];

  return (
    <Container
      component="main"
      sx={{
        mt: "56px",
        width: "80%",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        p: 0,
        pt: 2,
      }}
    >
      <CssBaseline />
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {boxList.map((data, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                name={data.name}
                variant="outlined"
                id={data.id}
                required
                inputRef={data.ref}
                label={data.label}
                type={data.type}
                sx={{ width: "60%" }}
              />
              {data.name === "currentPassword" ||
              data.name === "nickName" ||
              data.name === "passwordVali" ? (
                <Button variant="outlined" sx={{ ml: 2 }} onClick={data.vali}>
                  중복확인
                </Button>
              ) : null}
            </Grid>
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={infoUpdateSubmit}
          sx={{ mt: 2 }}
        >
          정보 수정
        </Button>
      </Box>
    </Container>
  );
};