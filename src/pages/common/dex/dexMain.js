import { Card, Grid, Typography, Box, TextField, Button } from "@mui/material";
import { Header } from "./header";
import { Container } from "@mui/system";
import Iconify from "../../../theme/Iconify";
import palette from "../../../theme/palette";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export const DexMain = () => {
  const location = useLocation();
  const [userState, setUserState] = useState({});

  const FONT_SIZE = 9;
  const DEFAULT_INPUT_WIDTH = 30;

  const [inputPoint, setInputPoint] = useState(location.state.userState.point);
  const [convertibleAmount, setConvertibleAmount] = useState(
    location.state.userState.point - location.state.userState.point * 0.1
  );
  const [inputWidth, setInputWidth] = useState(DEFAULT_INPUT_WIDTH);

  useEffect(() => {
    setUserState(location.state.userState);
  }, []);

  useEffect(() => {
    if (inputPoint.toString().length * FONT_SIZE > DEFAULT_INPUT_WIDTH) {
      setInputWidth((inputPoint.toString().length + 1) * FONT_SIZE);
    } else {
      setInputWidth(DEFAULT_INPUT_WIDTH);
    }
  }, [inputPoint]);

  const onChangeInput = (e) => {
    const inputValue = e.target.value;
    const onlyNumber = inputValue.replace(/[^0-9]/g, ""); // 숫자만 받아들임
    let parsedInput = parseInt(onlyNumber, 10);

    if (isNaN(parsedInput)) {
      parsedInput = 0;
    }

    if (parsedInput > location.state.userState.point) {
      parsedInput = location.state.userState.point;
    } else if (parsedInput < 0) {
      parsedInput = 0;
    }

    setInputPoint(parsedInput);
  };

  const handleConvert = () => {
    if (isNaN(inputPoint)) {
      setInputPoint(0);
    }

    const roundedInput = Math.floor(inputPoint / 10) * 10; // 마지막 자리를 0으로 세팅
    const convertibleAmount = // 변환 수수료~
      (roundedInput - roundedInput * 0.1).toLocaleString();

    setInputPoint(roundedInput);
    setConvertibleAmount(convertibleAmount);
  };

  const onBlurInput = () => {
    handleConvert();
  };

  const currencyExchangeButton = () => {
    console.log(`${inputPoint}을 환전 신청하셨습니다.`);
  };

  return (
    <>
      <Header />
      {location.state.userState ? (
        <Container
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card sx={{ pl: 2, py: 2, width: "90%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  From
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="/Item.svg"
                  sx={{ ml: -2, width: "150px" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  pr: 2,
                }}
              >
                <TextField
                  size="small"
                  required
                  variant="standard"
                  value={inputPoint.toLocaleString()}
                  InputProps={{
                    style: { width: `${inputWidth}px` },
                  }}
                  onChange={(e) => onChangeInput(e)}
                  onBlur={() => onBlurInput()}
                ></TextField>
                <Typography variant="subtitle1">Point</Typography>
              </Grid>
            </Grid>
          </Card>

          <Box
            sx={{
              width: "40px",
              height: "40px",
              transform: "rotate(-45deg)",
              transformOrigin: "0, 100%",
              backgroundColor: "#ddd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ddd",
              zIndex: 1200,

              my: -1,
            }}
          >
            <Iconify
              icon={"icon-park-outline:change"}
              color={palette.grey[800]}
              width={30}
              sx={{
                transform: "rotate(45deg)",
              }}
            />
          </Box>

          <Card sx={{ pl: 2, py: 2, width: "90%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  To
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                }}
              >
                <Box sx={{ ml: 1 }}>
                  <Typography variant="subtitle1">
                    {userState.account}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  pr: 2,
                }}
              >
                <Typography variant="subtitle1">
                  {convertibleAmount.toLocaleString()} \
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{ width: "90%", mt: 2 }}
            onClick={currencyExchangeButton}
          >
            환전
          </Button>
        </Container>
      ) : null}
    </>
  );
};
