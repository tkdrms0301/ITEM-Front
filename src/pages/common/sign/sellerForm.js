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

export const SellerForm = ({ roleType }) => {
  const emailRef = useRef(null);
  const nickName = useRef(null);
  const address = useRef(null);
  const password = useRef(null);
  const passwordVali = useRef(null);
  const phoneNumber = useRef(null);
  const companyName = useRef(null);
  const companyAddress = useRef(null);
  const companyNumber = useRef(null);
  const companyPhoneNumber = useRef(null);
  const companyDescription = useRef(null);

  const validateEmail = (e) => {
    console.log(emailRef.current.value);
  };
  const validateNickname = (e) => {
    console.log(nickName.current.value);
  };
  const validatePassword = (e) => {
    console.log(passwordVali.current.value);
  };
  const companyNumberPassword = (e) => {
    console.log(companyNumber.current.value);
  };

  const signUpSubmit = () => {
    console.log(roleType);
    console.log(emailRef.current.value);
    console.log(address.current.value);
    console.log(nickName.current.value);
    console.log(password.current.value);
    console.log(passwordVali.current.value);
    console.log(phoneNumber.current.value);
    console.log(companyName.current.value);
    console.log(companyNumber.current.value);
    console.log(companyAddress.current.value);
    console.log(companyPhoneNumber.current.value);
    console.log(companyDescription.current.value);
    window.location.replace("/login");
  };

  const boxList = [
    {
      name: "email",
      ref: emailRef,
      id: "email",
      label: "이메일 주소",
      type: "email",
      vali: validateEmail,
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
      vali: validateNickname,
    },

    {
      name: "password",
      ref: password,
      id: "password",
      label: "비밀번호",
      type: "password",
    },
    {
      name: "password-validate",
      ref: passwordVali,
      id: "password-validate",
      label: "비밀번호 확인",
      type: "password",
      vali: validatePassword,
    },
    {
      name: "phoneNumber",
      ref: phoneNumber,
      id: "phoneNumber",
      label: "개인 휴대전화(- 제외)",
      type: "phoneNumber",
    },
    {
      name: "companyName",
      ref: companyName,
      id: "companyName",
      label: "회사명",
      type: "companyName",
    },
    {
      name: "companyNumber",
      ref: companyNumber,
      id: "companyNumber",
      label: "사업자번호",
      type: "companyNumber",
      vali: companyNumberPassword,
    },
    {
      name: "companyPhoneNumber",
      ref: companyPhoneNumber,
      id: "companyPhoneNumber",
      label: "회사 전화번호",
      type: "companyPhoneNumber",
    },
    {
      name: "companyDescription",
      ref: companyDescription,
      id: "companyDescription",
      label: "회사 설명",
      type: "companyDescription",
    },
  ];

  return (
    <Container
      component="main"
      sx={{
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
              {data.name === "email" ||
              data.name === "nickName" ||
              data.name === "password-validate" ||
              data.name === "companyNumber" ? (
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
          onClick={signUpSubmit}
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link href="/login" variant="body2">
              이미 아이디가 있습니까? 로그인
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
