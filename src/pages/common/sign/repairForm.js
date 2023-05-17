import {
  Container,
  Grid,
  Link,
  TextField,
  CssBaseline,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { BaseUrl } from "../../../api/BaseUrl";
import { post } from "../../../api";

export const RepairForm = ({ roleType }) => {
  const emailRef = useRef(null);
  const nickName = useRef(null);
  const nameRef = useRef(null);
  const address = useRef(null);
  const password = useRef(null);
  const passwordVali = useRef(null);
  const phoneNumber = useRef(null);
  const account = useRef(null);
  const shopName = useRef(null);
  const shopAddress = useRef(null);
  const shopPhoneNumber = useRef(null);
  const shopDescription = useRef(null);

  const [check, setCheck] = useState({
    nickName: false,
    currentPassword: false,
  });

  // validateEmail
  const validateEmail = () => {
    const data = {
      email: emailRef.current?.value,
    };

    axios.post(BaseUrl + "/api/auth/email-check", data).then((response) => {
      if (response.data.success) {
        if (
          window.confirm(response.data.msg + "\n이메일을 사용하시겠습니까?")
        ) {
          setCheck({
            ...check,
            email: true,
          });
        } else {
          setCheck({
            ...check,
            email: false,
          });
        }
      } else {
        alert(response.data.msg);
        nickName.current.value = "";
      }
    });
  };

  const validateNickname = () => {
    const data = {
      nickname: nickName.current.value,
    };
    axios
      .post(BaseUrl + "/api/auth/nickname-check", data)
      .then((response) => {
        if (response.data.success) {
          if (
            window.confirm(response.data.msg + "\n닉네임을 사용하시겠습니까?")
          ) {
            setCheck({
              ...check,
              nickName: true,
            });
          } else {
            setCheck({
              ...check,
              nickName: false,
            });
          }
        } else {
          alert(response.data.msg);
          nickName.current.value = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signUpSubmit = () => {
    if (password.current?.value !== passwordVali.current?.value) {
      password.current.value = null;
      passwordVali.current.value = null;
      alert("동일하지 않은 새 비밀번호 입니다");
      return;
    }

    if (!(check.email && check.nickName)) {
      alert("검증이 필요한 항목에 대해서 검증이 되지 않았습니다");
      return;
    }
    console.log(roleType);
    const mechanicInfoDto = {
      description: shopDescription.current?.value,
      shopName: shopName.current?.value,
      shopPhoneNumber: shopPhoneNumber.current?.value,
      shopAddress: shopAddress.current?.value,
    };

    const data = {
      email: emailRef.current?.value,
      nickname: nickName.current?.value,
      password: password.current?.value,
      validPassword: passwordVali.current?.value,
      phoneNumber: phoneNumber.current?.value,
      name: nameRef.current?.value,
      address: address.current?.value,
      account: account.current?.value,
      roleType: roleType,
      sellerInfoDto: null,
      mechanicInfoDto: mechanicInfoDto,
    };

    axios
      .post(BaseUrl + "/api/auth/signup", data)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.msg);
          window.location.href = "/";
        } else {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // window.location.replace("/login");
  };

  const boxList = [
    {
      name: "email",
      ref: emailRef,
      id: "email",
      label: "이메일 주소",
      type: "email",
      vali: validateEmail,
      diable: check.email,
    },
    {
      name: "nickName",
      ref: nickName,
      id: "nickName",
      label: "닉네임(중복불가)",
      type: "nickName",
      vali: validateNickname,
      disable: check.nickName,
    },
    {
      name: "name",
      ref: nameRef,
      id: "name",
      label: "사용자 이름",
      type: "name",
      disable: false,
    },
    {
      name: "address",
      ref: address,
      id: "address",
      label: "사용자 주소",
      type: "address",
      vali: validateNickname,
      disable: false,
    },
    {
      name: "password",
      ref: password,
      id: "password",
      label: "비밀번호",
      type: "password",
      disable: false,
    },
    {
      name: "password-validate",
      ref: passwordVali,
      id: "password-validate",
      label: "비밀번호 확인",
      type: "password",
      disable: false,
    },
    {
      name: "phoneNumber",
      ref: phoneNumber,
      id: "phoneNumber",
      label: "개인 휴대전화(- 제외)",
      type: "phoneNumber",
      disable: false,
    },
    {
      name: "account",
      ref: account,
      id: "account",
      label: "계좌 번호(은행/-제외 계좌번호)",
      type: "account",
      disable: false,
    },
    {
      name: "shopName",
      ref: shopName,
      id: "shopName",
      label: "가게명",
      type: "shopName",
      disable: false,
    },
    {
      name: "shopAddress",
      ref: shopAddress,
      id: "shopAddress",
      label: "가게 주소",
      type: "shopAddress",
      disable: false,
    },
    {
      name: "shopPhoneNumber",
      ref: shopPhoneNumber,
      id: "shopPhoneNumber",
      label: "가게 전화번호",
      type: "shopPhoneNumber",
      disable: false,
    },
    {
      name: "shopDescription",
      ref: shopDescription,
      id: "shopDescription",
      label: "가게 설명",
      type: "shopDescription",
      disable: false,
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
      }}>
      <CssBaseline />
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
          {boxList.map((data, index) => (
            <Grid
              item
              xs={12}
              key={index}
              sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                name={data.name}
                variant="outlined"
                id={data.id}
                required
                inputRef={data.ref}
                label={data.label}
                type={data.type}
                disabled={data.disable}
                sx={{ width: "60%" }}
              />
              {data.name === "email" || data.name === "nickName" ? (
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
          sx={{ mt: 2 }}>
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
