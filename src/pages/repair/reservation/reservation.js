import {
  Autocomplete,
  FormControl,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  InputLabel,
  Card,
  Grid,
} from "@mui/material";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { reservationHistoryForUser } from "../data/test";
import SettingsIcon from "@mui/icons-material/Settings";
import "../css/RepairReport.css";
import Modal from "react-modal";
import { post, get } from "../../../api";
import { Header } from "./header";
import palette from "../../../theme/palette";
import { v4 as uuidv4 } from "uuid";

export const Reservation = () => {
  const navigate = useNavigate();

  //사용자 선택 가능한 목록 및 선택 가능한 서비스 목록
  const [userDevice, setUserDevice] = useState([]);
  const [repairShopServices, setRepairShopServices] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState([]);

  //멤버 제외 이미지 크게 보기 모달
  const [imgViewModalState, setImgViewModalState] = useState(false);
  const [imgViewModalImgState, setImgViewModalImgState] = useState("");

  // for update
  const [isUpdate, setIsUpdate] = useState(
    window.location.href.includes("update")
  );

  const { reservationId } = useParams();
  const location = useLocation();
  const { repairShopId } = useParams();
  const finalRepairShopId = isUpdate
    ? repairShopId
    : location.state?.repairShopId;

  const shopId = useParams();

  //처음예약
  const rvRequestImageInput = useRef();

  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteImgState, setDeleteImgState] = useState("");

  const getUpdateData = async () => {
    try {
      const res = await get(
        "http://localhost:8080/api/repair/reservation/history/detail",
        {
          params: { reservationId: reservationId },
        }
      );
      const getData = res.data;
      console.log(getData);
      setRepairShopServices(getData.services);

      getData.requestServices.map((item) => {
        setSelectedServiceName((prev) => [...prev, item.serviceName]);
      });
      return {
        productName: getData.productName,
        services: getData.requestServices,
        requestComment: getData.requestComment,
        date: getData.date,
        time: getData.time,
        prodImg: getData.prodImg,
        //rvRequestImgs: getData.rvRequestImgs,
        rvRequestImgs: [],
        repairShopId: getData.repairShopId,
      };
    } catch (error) {
      // 에러 처리
      console.error(error);
      return null;
    }
  };

  // ...

  const [reservationData, setReservationData] = useState({
    productName: "",
    services: [],
    requestComment: "",
    date: "",
    time: "",
    prodImg: "",
    rvRequestImgs: [],
    repairShopId: location.state?.repairShopId,
  });

  useEffect(() => {
    if (isUpdate) {
      getUpdateData().then((data) => {
        if (data) {
          setReservationData(data);
        } else {
          // 데이터를 가져오지 못한 경우에 대한 처리
        }
      });
    }
  }, [isUpdate]);

  //completed
  const [completed, setCompleted] = useState({
    isCompleted: false,
    msg: "필수 정보를 모두 입력해주세요.",
  });

  const handleCompleted = () => {
    if (
      reservationData.productName === "" ||
      reservationData.services.length === 0 ||
      reservationData.date === "" ||
      reservationData.time === ""
    ) {
      setCompleted({
        isCompleted: false,
        msg: "필수 정보를 모두 입력해주세요.",
      });
    } else {
      setCompleted({
        isCompleted: true,
        msg: "",
      });
    }
  };

  //completed end
  const handleData = (e) => {
    setReservationData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };

      const matchingItem = userDevice?.find(
        (item) => item.itName === e.target.value
      );
      if (matchingItem) {
        updatedData.prodImg = matchingItem.itImg;
      }

      return updatedData;
    });
  };
  const handleCommentData = (e) => {
    setReservationData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };

      updatedData.requestComment = e.target.value;

      return updatedData;
    });
  };
  const handleServicesButton = (e, value) => {
    setSelectedServiceName(value);

    const selectedServices = repairShopServices.filter((item) =>
      value.includes(item.serviceName)
    );

    setReservationData({ ...reservationData, services: selectedServices });
  };

  const handleDateSelect = (e) => {
    setReservationData({ ...reservationData, date: e.target.value });

    get("http://localhost:8080/api/repair/reservation/getEnableTime", {
      params: {
        repairShopId: finalRepairShopId,
        date: e.target.value,
      },
    })
      .then((res) => {
        setOpenedTime(res.data.reservationTimes);
        // 응답 처리
      })
      .catch((error) => {
        // 에러 처리
      });
    //for test
  };

  const handleTimeSelect = (e, value) => {
    setReservationData({ ...reservationData, time: value });
  };
  //transtmit data end

  //dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setReservationData({ ...reservationData, date: "", time: "" });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [openedTime, setOpenedTime] = useState([]);

  //dialog end
  useEffect(() => {
    handleCompleted();
  }, [reservationData]);

  useEffect(() => {
    post("http://localhost:8080/api/repair/reservation/init", {
      repairShopId: finalRepairShopId,
    })
      .then((res) => {
        setUserDevice(res.data.myItems);
        setRepairShopServices(res.data.services);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickRvRequestImgPlus = () => {
    rvRequestImageInput.current.click();
  };
  const saveRvRequestImgFile = () => {
    if (
      rvRequestImageInput.current &&
      rvRequestImageInput.current.files.length > 0
    ) {
      const file = rvRequestImageInput.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setReservationData({
          ...reservationData,
          rvRequestImgs: [...reservationData.rvRequestImgs, reader.result],
        });
      };
    }
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
    },
  };
  const modalImgStyles = {
    maxWidth: "100%",
    objectFit: "cover",
    width: "100%",
  };

  const reservationImgContentByIsUpdate = () => {
    return (
      <>
        <Modal
          isOpen={deleteModalState}
          style={modalStyles}
          ariaHideApp={false}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              onClick={() => {
                setReservationData({
                  ...reservationData,
                  rvRequestImgs: reservationData.rvRequestImgs.filter(
                    (img) => img !== deleteImgState
                  ),
                });
                setDeleteModalState(false);
              }}
            >
              삭제
            </Button>
            <Button onClick={() => setDeleteModalState(false)}>취소</Button>
          </Box>
        </Modal>

        <Modal
          isOpen={imgViewModalState}
          style={modalStyles}
          ariaHideApp={false}
        >
          <img
            src={imgViewModalImgState}
            onClick={() => setImgViewModalState(false)}
            style={modalImgStyles}
            alt="requsetImg"
          />
        </Modal>
        <div className="img_common_field">
          {reservationData.rvRequestImgs.map((img, index) => (
            <Box key={index} sx={{ width: "200px", margin: "0 auto" }}>
              <Box
                component="img"
                src={img}
                alt="rvImgs"
                sx={{
                  border: "1px solid #f1f1f1",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  top: "0px",
                  bottom: "0px",
                  my: 1,
                }}
                onClick={() => {
                  if (
                    JSON.parse(window.localStorage.getItem("user")).roleType ===
                    "MEMBER"
                  ) {
                    setDeleteModalState(true);
                    setDeleteImgState(img);
                  } else {
                    setImgViewModalState(true);
                    setImgViewModalImgState(img);
                  }
                }}
              />
            </Box>
          ))}
          {JSON.parse(window.localStorage.getItem("user")).roleType ===
          "MEMBER" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={"/camera-outline.svg"}
                  alt="손상부위 사진"
                  sx={{ minWidth: "100px", margin: "0 auto" }}
                />
                <Button
                  variant="contained"
                  component="label"
                  color="inherit"
                  sx={{
                    borderRadius: "20px",
                    bgcolor: "white",
                    color: "ButtonText",
                    mb: 2,
                  }}
                  onClick={() => onClickRvRequestImgPlus()}
                >
                  <Typography variant="subtitle2">+ 사진추가</Typography>
                </Button>
              </Box>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={rvRequestImageInput}
                onChange={saveRvRequestImgFile}
              />
            </>
          ) : null}
        </div>
      </>
    );
  };

  function isBase64Encoded(data) {
    const base64Regex = /^data:(.*?);base64,/;

    return base64Regex.test(data);
  }
  const onClickReservationRegister = () => {
    if (completed.isCompleted) {
      const query = isUpdate
        ? "http://localhost:8080/api/repair/reservation/update"
        : "http://localhost:8080/api/repair/reservation/add";

      const formData = new FormData();
      for (let i = 0; i < reservationData.rvRequestImgs.length; i++) {
        const imageData = reservationData.rvRequestImgs[i];
        const uniqueId = uuidv4();

        // Base64로 올바르게 인코딩된 문자열인 경우에만 처리
        if (isBase64Encoded(imageData)) {
          const base64Data = imageData;
          const byteCharacters = atob(base64Data.split(",")[1]);
          const byteArrays = new Uint8Array(byteCharacters.length);

          for (let j = 0; j < byteCharacters.length; j++) {
            byteArrays[j] = byteCharacters.charCodeAt(j);
          }

          const blob = new Blob([byteArrays], { type: "image/png" });
          const fileName = `${uniqueId}-${i + 1}.jpg`;
          formData.append("rvRequestImgs", blob, fileName);
        } else {
          formData.append("rvRequestImgs", imageData);
        }
      }
      formData.append("requestComment", reservationData.requestComment || "");
      formData.append("prodImg", reservationData.prodImg);
      formData.append("repairShopId", reservationData.repairShopId);

      formData.append("productName", reservationData.productName);
      for (let i = 0; i < reservationData.services.length; i++) {
        formData.append("serviceName", reservationData.services[i].serviceName);
        formData.append("price", reservationData.services[i].price);
      }
      formData.append("date", reservationData.date);
      formData.append("time", reservationData.time);

      if (reservationId !== null && reservationId !== undefined) {
        console.log(reservationId);
        formData.append("reservationId", reservationId.toString());
      }

      post(query, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        //console.log(res);
      });
      navigate(-1);
    } else {
      window.alert(completed.msg);
    }
  };

  //현재시간 이전 시간들 disabled
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

  var filteredTimes = openedTime.filter((time) => {
    if (reservationData.date === new Date().toISOString().split("T")[0]) {
      // 오늘 날짜인 경우 현재 시간 이전의 시간들을 필터링
      var [hour, minute] = time.time.split(":");
      return (
        parseInt(hour) > currentHour ||
        (parseInt(hour) === currentHour && parseInt(minute) >= currentMinute)
      );
    } else {
      // 오늘 이후의 날짜인 경우 모든 시간을 허용
      return true;
    }
  });

  return (
    <>
      <Header title={isUpdate ? "예약 수정" : "예약 신청"} />
      {repairShopServices.length !== 0 ? (
        <>
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
            <DialogTitle>예약 시간 선택</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <input
                  type="date"
                  value={reservationData.date}
                  onChange={handleDateSelect}
                  min={new Date().toISOString().split("T")[0]}
                  style={{ width: "80%" }}
                />
              </Box>
              {reservationData.date && (
                <ToggleButtonGroup
                  exclusive
                  value={reservationData.time}
                  onChange={handleTimeSelect}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {filteredTimes.map((time) => {
                    return (
                      <ToggleButton
                        key={time.time}
                        value={time.time}
                        disabled={!time.enable}
                        sx={{
                          flex: "0 0 auto",
                          whiteSpace: "nowrap",
                          border: "none",
                        }}
                      >
                        {time.time}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              )}
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleCancel}>
                취소
              </Button>
              <Button
                variant="outlined"
                readOnly={
                  reservationData.date === "" || reservationData.time === ""
                }
                onClick={handleClose}
              >
                선택
              </Button>
            </DialogActions>
          </Dialog>

          <Container sx={{ width: "100%" }}>
            <Card
              sx={{
                mt: 2,
                mb: 2,
                boxShadow: 10,
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl fullWidth sx={{ mt: 1 }}>
                      <InputLabel>제품 선택</InputLabel>
                      <Select
                        name="productName"
                        value={reservationData.productName}
                        defaultValue={""}
                        onChange={handleData}
                        label="제품 선택"
                        fullWidth
                      >
                        {userDevice.map((item, index) => (
                          <MenuItem value={item.itName} key={index}>
                            {item.itName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    mt: 2,
                    backgroundColor: "ButtonHighlight",
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></Grid>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    width: "100%",
                    height: "100px",
                    border: "1px solid #C4C4C4",
                    borderRadius: "4px",
                    mt: "3%",
                    padding: "3%",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      top: -10,
                      left: 10,
                      bgcolor: "white",
                      px: 1,
                      fontSize: "0.8rem",
                    }}
                  >
                    제품 정보
                  </Typography>
                  <Box
                    component="img"
                    src={
                      reservationData.prodImg ? reservationData.prodImg : null
                    }
                    sx={{
                      width: "40%",
                      height: "100%",
                      mr: "5%",
                      borderRadius: "10px",
                    }}
                  />
                  <Typography>{reservationData.productName}</Typography>
                </Box>
              </Grid>
            </Card>
          </Container>

          <Container sx={{ pt: "1%" }}>
            <Card sx={{ boxShadow: 10 }}>
              <Typography variant="h6" sx={{ color: "GrayText", ml: 2, mt: 1 }}>
                서비스 선택
              </Typography>
              <ToggleButtonGroup
                value={selectedServiceName}
                onChange={handleServicesButton}
                sx={{
                  mt: "3%",
                  width: "100%",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {repairShopServices.map((service, index) => (
                  <ToggleButton
                    key={index}
                    value={service.serviceName}
                    sx={{
                      boxShadow: 10,
                      my: 1,
                      borderRadius: "5px",
                      py: 1,
                      pl: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        borderBottom: "2px solid #f1f1f1",
                        pb: 2,
                      }}
                    >
                      <Typography variant="h5">
                        {service.serviceName}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: palette.error.main, mt: 0.5 }}
                      >
                        ITEM 특가
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 800 }}
                        >
                          {service.price.toLocaleString()}원
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            ml: 0.5,
                            textDecoration: "line-through",
                          }}
                        >
                          {(service.price + 10000).toLocaleString()}원
                        </Typography>
                      </Box>
                    </Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Card>

            {/* <Box
              sx={{
                position: "relative",
                width: "100%",
                border: "1px solid #C4C4C4",
                borderRadius: "4px",
                mt: "3%",
                padding: "3%",
                alignItems: "center",
              }}
              className="reservation_img_field"
            > */}
            <Card sx={{ boxShadow: 10, mt: 2, py: 1 }}>
              <Typography variant="h6" sx={{ color: "GrayText", ml: 2, mt: 1 }}>
                예약 제품 상태 이미지 등록
              </Typography>

              {reservationImgContentByIsUpdate()}
            </Card>
            <Card
              variant="outlined"
              sx={{
                pb: 1,
                boxShadow: 10,
                mt: 2,
              }}
            >
              <Typography variant="h6" sx={{ color: "GrayText", ml: 2, mt: 1 }}>
                요청 사항
              </Typography>
              <TextField
                variant="standard"
                name="requestComment"
                value={reservationData.requestComment}
                onChange={handleCommentData}
                placeholder="요청 사항을 입력해주세요."
                fullWidth
                multiline
                rows={2}
                sx={{ m: "3%" }}
                InputProps={{
                  disableUnderline: true, // <== added this
                }}
              ></TextField>
            </Card>

            <Card
              variant="outlined"
              sx={{
                pb: 1,
                boxShadow: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "3%",
                padding: "3%",
                width: "100%",
                height: "100px",
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  방문 시간 선택
                </Typography>
                <Typography variant="body1">
                  {reservationData.date} {reservationData.time}
                </Typography>
              </Box>

              <Button variant="contained" sx={{}} onClick={handleOpen}>
                날짜/시간 선택
              </Button>
            </Card>
          </Container>
        </>
      ) : null}
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        onClick={onClickReservationRegister}
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "ButtonFace",
          color: "ButtonText",
        }}
      >
        {isUpdate ? "예약 수정" : " 예약 신청"}
      </Button>
    </>
  );
};
