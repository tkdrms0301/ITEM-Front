import {
  Container,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Box,
  Select,
  MenuItem,
  Typography,
  InputLabel,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { get, post } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";
import axios from "axios";

export const UpdateFormMechanic = () => {
  const repairServiceTypes = [
    { value: 0, label: "수리 서비스 타입" },
    { value: 1, label: "모바일" },
    { value: 2, label: "태블릿" },
    { value: 3, label: "노트북" },
    { value: 4, label: "컴퓨터" },
  ];
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

  const [curServiceType, setCurServiceType] = useState(0);

  const onChangeServiceType = (e) => {
    setCurServiceType(e.target.value);
  };

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

    if (curServiceType === 0) {
      alert("수리 서비스 타입을 선택해주세요");
      return;
    }

    const mechanicInfoDto = {
      shopName: shopName.current?.value,
      shopAddress: shopAddress.current?.value,
      shopPhoneNumber: shopPhoneNumber.current?.value,
      description: shopDescription.current?.value,
      repairServiceType: curServiceType,
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

  let boxList = [
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
      type: "password",
      disable: false,
    },
    {
      name: "passwordVali",
      ref: passwordVali,
      id: "passwordVali",
      label: "비밀번호 확인",
      type: "password",
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

  useEffect(() => {
    get(BaseUrl + "/api/member/info")
      .then((res) => {
        const info = res.data.data;
        console.log(info);
        nickName.current.value = info.nickname;
        address.current.value = info.address;
        phoneNumber.current.value = info.phoneNumber;
        account.current.value = info.account;
        shopName.current.value = info.mechanicInfoDto.shopName;
        shopAddress.current.value = info.mechanicInfoDto.shopAddress;
        shopPhoneNumber.current.value = info.mechanicInfoDto.shopPhoneNumber;
        shopDescription.current.value = info.mechanicInfoDto.description;
        console.log(info.mechanicInfoDto.repairServiceType);
        if (info.mechanicInfoDto.repairServiceType === "모바일") {
          setCurServiceType(1);
        } else if (info.mechanicInfoDto.repairServiceType === "태블릿") {
          setCurServiceType(2);
        } else if (info.mechanicInfoDto.repairServiceType === "노트북") {
          setCurServiceType(3);
        } else if (info.mechanicInfoDto.repairServiceType === "컴퓨터") {
          setCurServiceType(4);
        } else {
          setCurServiceType(0);
        }
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
                InputLabelProps={{ shrink: true }}
                name={data.name}
                variant="outlined"
                id={data.id}
                required
                inputRef={data.ref}
                type={data.type}
                label={data.label}
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
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Select
              value={curServiceType}
              onChange={onChangeServiceType}
              sx={{ width: "60%" }}
            >
              {repairServiceTypes.map((repairServiceType, index) => (
                <MenuItem key={index} value={repairServiceType.value}>
                  <Typography align="left">
                    {repairServiceType.label}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={infoUpdateSubmit}
            sx={{ mt: 1 }}
          >
            정보 수정
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};
