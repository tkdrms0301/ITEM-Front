import {
  Container,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { get, post } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";
import axios from "axios";

export const UpdateFormSeller = () => {
  const nickName = useRef(null);
  const address = useRef(null);
  const currentPassword = useRef(null);
  const newPassword = useRef(null);
  const passwordVali = useRef(null);
  const phoneNumber = useRef(null);
  const account = useRef(null);
  const companyName = useRef(null);
  const companyAddress = useRef(null);
  const companyNumber = useRef(null);
  const companyPhoneNumber = useRef(null);
  const companyDescription = useRef(null);

  const [check, setCheck] = useState({
    nickName: false,
    currentPassword: false,
    companyNumber: false,
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
    post(BaseUrl + "/api/member/nickname-check-update", data)
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

  const companyNumberPassword = () => {
    const data = {
      companyNumber: companyNumber.current?.value,
    };

    post(BaseUrl + "/api/member/company-number-check-update", data)
      .then((response) => {
        if (response.data.success) {
          if (window.confirm("사업자 번호를 사용하시겠습니까?")) {
            setCheck({
              ...check,
              companyNumber: true,
            });
          } else {
            setCheck({
              ...check,
              companyNumber: false,
            });
          }
        } else {
          alert(response.data.msg);
          companyNumber.current.value = "";
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

    if (!(check.nickName && check.currentPassword && check.companyNumber)) {
      alert("검증이 필요한 항목에 대해서 검증이 되지 않았습니다");
      return;
    }

    const sellerData = {
      companyAddress: companyAddress.current?.value,
      companyPhoneNumber: companyPhoneNumber.current?.value,
      companyName: companyName.current?.value,
      companyNumber: companyNumber.current?.value,
      description: companyAddress.current?.value,
    };

    const data = {
      nickname: nickName.current?.value,
      address: address.current?.value,
      currentPassword: currentPassword.current?.value,
      newPassword: newPassword.current?.value,
      validPassword: passwordVali.current?.value,
      phoneNumber: phoneNumber.current?.value,
      account: account.current?.value,
      sellerInfoDto: sellerData,
      mechanicInfoDto: null,
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
      name: "account",
      ref: account,
      id: "account",
      label: "계좌 번호(은행/-제외 계좌번호)",
      type: "account",
      disable: false,
    },
    {
      name: "companyName",
      ref: companyName,
      id: "companyName",
      label: "회사명",
      type: "companyName",
      disable: false,
    },
    {
      name: "companyNumber",
      ref: companyNumber,
      id: "companyNumber",
      label: "사업자번호",
      type: "companyNumber",
      vali: companyNumberPassword,
      disable: check.companyNumber,
    },
    {
      name: "companyAddress",
      ref: companyAddress,
      id: "companyAddress",
      label: "회사 주소",
      type: "companyAddress",
      disable: false,
    },
    {
      name: "companyPhoneNumber",
      ref: companyPhoneNumber,
      id: "companyPhoneNumber",
      label: "회사 전화번호",
      type: "companyPhoneNumber",
      disable: false,
    },
    {
      name: "companyDescription",
      ref: companyDescription,
      id: "companyDescription",
      label: "회사 설명",
      type: "companyDescription",
      disable: false,
    },
  ];

  useEffect(() => {
    get(BaseUrl + "/api/member/info")
      .then((res) => {
        const info = res.data.data;
        console.log(info);
        nickName.current.value = info.nickname;
        address.current.value = info.address;
        phoneNumber.current.value = info.phoneNumber;
        account.current.value = info.account;
        companyName.current.value = info.sellerInfoDto.companyName;
        companyAddress.current.value = info.sellerInfoDto.companyAddress;
        companyPhoneNumber.current.value =
          info.sellerInfoDto.companyPhoneNumber;
        companyNumber.current.value = info.sellerInfoDto.companyNumber;
        companyDescription.current.value = info.sellerInfoDto.description;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                InputLabelProps={{ shrink: true }}
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
              {data.name === "currentPassword" ||
              data.name === "nickName" ||
              data.name === "companyNumber" ? (
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
