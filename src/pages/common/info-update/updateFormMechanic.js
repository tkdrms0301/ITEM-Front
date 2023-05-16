import {
  Container,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Box,
} from "@mui/material";
import { useRef, useState } from "react";
import { post } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";
import axios from "axios";

export const UpdateFormMechanic = () => {
  const nickName = useRef(null);
  const address = useRef(null);
  const newPassword = useRef(null);
  const passwordVali = useRef(null);
  const phoneNumber = useRef(null);
  const account = useRef(null);
  const currentPassword = useRef(null);
  const shopName = useRef(null);
  const shopAddress = useRef(null);
  const shopPhoneNumber = useRef(null);
  const shopDescription = useRef(null);

  const [check, setCheck] = useState({
    nickName: false,
    currentPassword: false,
  });

  const validatecurrentPassword = () => {
    const data = {
      password: currentPassword.current.value,
    };

    post(BaseUrl + "/api/member/password-check", data)
      .then((response) => {
        if (response.data.success) {
          alert("현재 비밀번호 검증 완료");
          setCheck({
            ...check,
            currentPassword: true,
          });
        } else {
          alert("현재 비밀번호 검증 실패");
        }
      })
      .catch((error) => {
        console.log(error);
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

  const infoUpdateSubmit = () => {
    if (newPassword.current?.value !== passwordVali.current?.value) {
      newPassword.current.value = null;
      passwordVali.current.value = null;
      alert("동일하지 않은 새 비밀번호 입니다");
      return;
    }

    if (!(check.nickName && check.currentPassword)) {
      alert("검증이 필요한 항목에 대해서 검증이 되지 않았습니다");
      return;
    }

    const mechanicInfoDto = {
      shopName: shopName.current?.value,
      shopAddress: shopAddress.current?.value,
      description: shopDescription.current?.value,
    };
    const data = {
      nickname: nickName.current?.value,
      currentPassword: currentPassword.current?.value,
      newPassword: newPassword.current?.value,
      validPassword: passwordVali.current?.value,
      phoneNumber: phoneNumber.current?.value,
      address: address.current?.value,
      account: account.current?.value,
      sellerInfoDto: null,
      mechanicInfoDto: mechanicInfoDto,
    };

    post(BaseUrl + "/api/member/update", data)
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
  };

  const boxList = [
    {
      name: "currentPassword",
      ref: currentPassword,
      id: "currentPassword",
      label: "현재 비밀번호 확인",
      type: "password",
      vali: validatecurrentPassword,
      disable: check.currentPassword,
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
      name: "address",
      ref: address,
      id: "address",
      label: "사용자 주소",
      type: "address",
      disable: false,
    },
    {
      name: "newPassword",
      ref: newPassword,
      id: "newPassword",
      label: "새 비밀번호",
      type: "newPassword",
      disable: false,
    },
    {
      name: "passwordVali",
      ref: passwordVali,
      id: "passwordVali",
      label: "비밀번호 확인",
      type: "passwordVali",
      disable: false,
    },
    {
      name: "phoneNumber",
      ref: phoneNumber,
      id: "phoneNumber",
      label: "개인 휴대전화(-제외)",
      type: "phoneNumber",
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
        mt: "56px",
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
              {data.name === "currentPassword" || data.name === "nickName" ? (
                <Button variant="outlined" sx={{ ml: 2 }} onClick={data.vali}>
                  {data.name === "currentPassword" ? "검증" : "중복확인"}
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
          sx={{ mt: 2 }}>
          정보 수정
        </Button>
      </Box>
    </Container>
  );
};
