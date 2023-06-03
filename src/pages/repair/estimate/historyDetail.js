import { useEffect, useState } from "react";
import { estimateHistoryForRepair, estimateHistoryForUser } from "../data/test";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { useNavigate } from "react-router-dom";
import { Header } from "./header";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { EstimateUploadFile } from "./estimateUploadFile";
import { EstimateComment } from "./estimateComment";
import { useLocation, useParams } from "react-router-dom";
import { post, get } from "../../../api";
import { set } from "date-fns";
import { BaseUrl } from "../../../api/BaseUrl";

export const EstimateHistoryDetail = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState();

  const { estimateId } = useParams();

  const [isUpdating, setIsUpdating] = useState(false);
  const handleUpdate = () => {
    setIsUpdating(true);
  };
  const [formData, setFormData] = useState({
    comment: "",
    minPrice: 0,
    maxPrice: 0,
    minTime: 0,
    maxTime: 0,
  });

  const [completed, setCompleted] = useState({
    isCompleted: false,
    msg: "필수 정보를 모두 입력해주세요.",
  });

  const handleCompleted = () => {
    if (formData.comment !== "" && formData.maxPrice !== 0) {
      if (parseInt(formData.maxPrice) < parseInt(formData.minPrice)) {
        setCompleted({
          isCompleted: false,
          msg: "최소 금액이 최대 금액보다 큽니다.",
        });
      } else if (formData.minTime > formData.maxTime) {
        setCompleted({
          isCompleted: false,
          msg: "최소 시간이 최대 시간보다 큽니다.",
        });
      } else if (formData.minTime === 0 && formData.maxTime === 0) {
        setCompleted({
          isCompleted: false,
          msg: "시간을 입력하세요.",
        });
      } else {
        setCompleted({
          isCompleted: true,
          msg: "",
        });
      }
    } else {
      setCompleted({
        isCompleted: false,
        msg: "필수 정보를 모두 입력해주세요.",
      });
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    handleFormData(e);
  };
  useEffect(() => {
    handleCompleted();
  }, [formData]);

  useEffect(() => {
    get(BaseUrl + "/api/repair/estimate/history/detail", {
      params: {
        estimateId: estimateId,
      },
    }).then((res) => {
      setData({
        id: res.data.id,
        description: res.data.description,
        itDevice: res.data.itDevice,
        status: res.data.status,
        requestImg: res.data.requestImg && res.data.requestImg,
      });
      setFormData({
        estimateId: res.data.id,
        comment: res.data.comment && res.data.comment,
        minPrice: res.data.minPrice && res.data.minPrice,
        maxPrice: res.data.maxPrice && res.data.maxPrice,
        minTime: res.data.minTime && res.data.minTime,
        maxTime: res.data.maxTime && res.data.maxTime,
      });
    });
  }, []);

  const timeList = [
    {
      value: 0,
      label: "0시간",
    },
    {
      value: 1,
      label: "1시간",
    },
    {
      value: 2,
      label: "2시간",
    },
    {
      value: 3,
      label: "3시간",
    },
    {
      value: 4,
      label: "4시간",
    },
    {
      value: 5,
      label: "5시간",
    },
    {
      value: 6,
      label: "6시간",
    },
    {
      value: 7,
      label: "7시간",
    },
    {
      value: 8,
      label: "8시간",
    },
    {
      value: 9,
      label: "9시간",
    },
    {
      value: 10,
      label: "10시간",
    },
    {
      value: 11,
      label: "11시간",
    },
    {
      value: 12,
      label: "12시간",
    },
  ];

  const onClickResponseRegist = () => {
    if (completed.isCompleted === false) {
      window.alert(completed.msg);
      return;
    }
    if (isUpdating) {
      //응답
      post(BaseUrl + "/api/repair/estimate/responseRegist", formData).then(
        (res) => {
          //console.log(res);
        }
      );
      navigate(-1);
    } else {
      window.alert(completed.msg);
    }
  };

  return (
    <>
      {data ? (
        <>
          <Header />
          <EstimateUploadFile
            data={data}
            myItDevices={data.itDevice}
            setData={setData}
            isHistory={true}
          />

          <EstimateComment
            completed={completed}
            data={data}
            isHistory={true}></EstimateComment>

          <Container sx={{ width: "100%", marginTop: "20px" }}>
            <Card
              variant="outlined"
              sx={{
                pb: 1,
                boxShadow: 10,
              }}>
              <Typography variant="h6" sx={{ color: "GrayText", ml: 2, mt: 1 }}>
                응답 정보
              </Typography>
              <TextField
                variant="standard"
                name="comment"
                value={formData.comment}
                onChange={handleFormData}
                placeholder="응답 대기 중"
                fullWidth
                multiline
                rows={2}
                sx={{ m: "3%" }}
                InputProps={{
                  disableUnderline: true, // <== added this
                }}
                inputProps={{
                  readOnly:
                    JSON.parse(window.localStorage.getItem("user")).roleType !==
                      "MECHANIC" || !isUpdating
                      ? true
                      : false,
                }}></TextField>
            </Card>
          </Container>

          <>
            <Container sx={{ width: "100%", marginTop: "20px" }}>
              <Card
                variant="outlined"
                sx={{
                  pb: 1,
                  boxShadow: 10,
                }}>
                <Typography
                  variant="h6"
                  sx={{ color: "GrayText", ml: 2, mt: 1 }}>
                  예상 금액
                </Typography>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                  marginTop={2}>
                  <Grid item xs={4}>
                    <TextField
                      label="최소"
                      size="small"
                      type="number"
                      name="minPrice"
                      value={formData.minPrice}
                      onChange={handleChange}
                      inputProps={{
                        readOnly:
                          JSON.parse(window.localStorage.getItem("user"))
                            .roleType !== "MECHANIC" || !isUpdating
                            ? true
                            : false,
                      }}
                    />
                    <Typography sx={{ ml: "10%" }}>ITEM 포인트</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <p>~</p>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="최대"
                      size="small"
                      type="number"
                      required
                      name="maxPrice"
                      value={formData.maxPrice}
                      onChange={handleChange}
                      inputProps={{
                        readOnly:
                          JSON.parse(window.localStorage.getItem("user"))
                            .roleType !== "MECHANIC" || !isUpdating
                            ? true
                            : false,
                      }}
                    />
                    <Typography sx={{ ml: "10%" }}>ITEM 포인트</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Container>

            <Container sx={{ width: "100%", marginTop: "20px" }}>
              <Card
                variant="outlined"
                sx={{
                  pb: 1,
                  boxShadow: 10,
                }}>
                <Typography
                  variant="h6"
                  sx={{ color: "GrayText", ml: 2, mt: 1 }}>
                  예상 소요 시간
                </Typography>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                  marginTop={2}>
                  <Grid item xs={4}>
                    <FormControl fullWidth required>
                      <InputLabel>최소</InputLabel>
                      <Select
                        name="minTime"
                        value={formData.minTime}
                        onChange={handleChange}
                        readOnly={
                          JSON.parse(window.localStorage.getItem("user"))
                            .roleType !== "MECHANIC" || !isUpdating
                            ? true
                            : false
                        }>
                        {timeList.map((time) => (
                          <MenuItem key={time.label} value={time.value}>
                            {time.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <p>~</p>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth required>
                      <InputLabel>최대</InputLabel>
                      <Select
                        name="maxTime"
                        value={formData.maxTime}
                        onChange={handleChange}
                        readOnly={
                          JSON.parse(window.localStorage.getItem("user"))
                            .roleType !== "MECHANIC" || !isUpdating
                            ? true
                            : false
                        }>
                        {timeList.map((time) =>
                          time.value === 0 ? null : (
                            <MenuItem key={time.label} value={time.value}>
                              {time.label}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
            </Container>
          </>

          {JSON.parse(window.localStorage.getItem("user")).roleType ===
            "MECHANIC" && data.status === "응답 대기" ? (
            <>
              {!isUpdating && (
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  fullWidth
                  sx={{ mt: "3%" }}>
                  견적 응답 작성
                </Button>
              )}
            </>
          ) : null}

          {isUpdating ? (
            <Button
              fullWidth
              variant="contained"
              color="inherit"
              onClick={onClickResponseRegist}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "ButtonFace",
                color: "ButtonText",
              }}>
              견적 응답 등록
            </Button>
          ) : null}
        </>
      ) : null}
    </>
  );
};
